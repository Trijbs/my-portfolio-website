import { createClient } from '@supabase/supabase-js';

const MAX_EVENTS = 10000;
const SUPABASE_BATCH_SIZE = 1000;
const DEFAULT_TABLE = 'analytics_events';

let memoryEvents = [];
let supabaseClient = null;
let storageFallbackReason = null;

function decodeJwtPayload(token = '') {
    const parts = token.split('.');
    if (parts.length !== 3) {
        return null;
    }

    try {
        return JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    } catch (error) {
        return null;
    }
}

function hasSupabaseConfig() {
    return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function getSupabaseTable() {
    return process.env.SUPABASE_ANALYTICS_TABLE || DEFAULT_TABLE;
}

function getSupabaseKeyType() {
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    if (!key) {
        return 'missing';
    }

    if (key.startsWith('sb_secret_')) {
        return 'sb_secret';
    }

    if (key.startsWith('sb_publishable_')) {
        return 'sb_publishable';
    }

    const jwtPayload = decodeJwtPayload(key);
    if (typeof jwtPayload?.role === 'string' && jwtPayload.role) {
        return `jwt-${jwtPayload.role}`;
    }

    return 'unknown';
}

function buildSupabaseDiagnostics() {
    return {
        table: getSupabaseTable(),
        hasSupabaseUrl: Boolean(process.env.SUPABASE_URL),
        hasSupabaseServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
        supabaseKeyType: getSupabaseKeyType()
    };
}

function createStorageError(operation, error, context = {}) {
    const wrappedError = new Error(`Supabase ${operation} failed: ${error?.message || 'Unknown error'}`);

    wrappedError.name = 'AnalyticsStorageError';
    wrappedError.cause = error;
    wrappedError.analyticsContext = {
        operation,
        ...buildSupabaseDiagnostics(),
        ...context,
        supabaseError: error ? {
            message: error.message || null,
            code: error.code || null,
            details: error.details || null,
            hint: error.hint || null,
            status: error.status || null
        } : null
    };

    return wrappedError;
}

function getSupabaseClient() {
    if (!hasSupabaseConfig()) {
        return null;
    }

    if (!supabaseClient) {
        supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });
    }

    return supabaseClient;
}

function hasActiveSupabaseStorage() {
    return hasSupabaseConfig() && !storageFallbackReason;
}

function appendMemoryEvent(event) {
    memoryEvents.unshift(event);
    memoryEvents = memoryEvents.slice(0, MAX_EVENTS);
}

function activateMemoryFallback(error) {
    if (!storageFallbackReason) {
        storageFallbackReason = error instanceof Error ? error.message : 'Unknown storage failure';
        console.error('Analytics storage fallback activated:', error);
    }
}

function normalizeEvent(event = {}) {
    const timestamp = Number(event.timestamp) || Date.now();
    const serverTimestamp = Number(event.serverTimestamp) || Date.now();

    return {
        ...event,
        id: typeof event.id === 'string' && event.id
            ? event.id
            : `${timestamp.toString(36)}${Math.random().toString(36).slice(2)}`,
        eventType: typeof event.eventType === 'string' && event.eventType ? event.eventType : 'event',
        path: typeof event.path === 'string' ? event.path : '',
        userId: typeof event.userId === 'string' && event.userId ? event.userId : null,
        sessionId: typeof event.sessionId === 'string' && event.sessionId ? event.sessionId : null,
        ip: typeof event.ip === 'string' && event.ip ? event.ip : null,
        timestamp,
        serverTimestamp
    };
}

function buildSupabaseRow(event) {
    const normalized = normalizeEvent(event);

    return {
        id: normalized.id,
        event_type: normalized.eventType,
        path: normalized.path || null,
        user_id: normalized.userId,
        session_id: normalized.sessionId,
        timestamp: normalized.timestamp,
        server_timestamp: normalized.serverTimestamp,
        ip: normalized.ip,
        payload: normalized
    };
}

function parseStoredEvent(row) {
    if (!row || typeof row.payload !== 'object' || row.payload === null) {
        return null;
    }

    return normalizeEvent(row.payload);
}

async function readSupabaseEvents(limit, offset) {
    const client = getSupabaseClient();
    const end = offset + limit - 1;
    const { data, error } = await client
        .from(getSupabaseTable())
        .select('payload')
        .order('timestamp', { ascending: false })
        .range(offset, end);

    if (error) {
        throw createStorageError('read', error, { limit, offset });
    }

    return Array.isArray(data) ? data.map(parseStoredEvent).filter(Boolean) : [];
}

export async function appendAnalyticsEvent(event) {
    const normalized = normalizeEvent(event);

    if (!hasActiveSupabaseStorage()) {
        appendMemoryEvent(normalized);
        return;
    }

    try {
        const { error } = await getSupabaseClient()
            .from(getSupabaseTable())
            .upsert(buildSupabaseRow(normalized), {
                onConflict: 'id'
            });

        if (error) {
            throw createStorageError('write', error, {
                eventId: normalized.id,
                eventType: normalized.eventType,
                path: normalized.path || null
            });
        }
    } catch (error) {
        activateMemoryFallback(error);
        appendMemoryEvent(normalized);
    }
}

export async function readAnalyticsEvents(limit = 100, offset = 0) {
    if (!hasActiveSupabaseStorage()) {
        return memoryEvents.slice(offset, offset + limit);
    }

    try {
        return await readSupabaseEvents(limit, offset);
    } catch (error) {
        activateMemoryFallback(error);
        return memoryEvents.slice(offset, offset + limit);
    }
}

export async function readAllAnalyticsEvents() {
    if (!hasActiveSupabaseStorage()) {
        return [...memoryEvents];
    }

    try {
        const events = [];

        for (let offset = 0; offset < MAX_EVENTS; offset += SUPABASE_BATCH_SIZE) {
            const batch = await readSupabaseEvents(
                Math.min(SUPABASE_BATCH_SIZE, MAX_EVENTS - offset),
                offset
            );

            events.push(...batch);

            if (batch.length < SUPABASE_BATCH_SIZE) {
                break;
            }
        }

        return events;
    } catch (error) {
        activateMemoryFallback(error);
        return [...memoryEvents];
    }
}

export async function countAnalyticsEvents() {
    if (!hasActiveSupabaseStorage()) {
        return memoryEvents.length;
    }

    try {
        const { count, error } = await getSupabaseClient()
            .from(getSupabaseTable())
            .select('id', { count: 'exact', head: true });

        if (error) {
            throw createStorageError('count', error);
        }

        return Number(count) || 0;
    } catch (error) {
        activateMemoryFallback(error);
        return memoryEvents.length;
    }
}

export function getAnalyticsStorageMode() {
    if (storageFallbackReason) {
        return 'memory-fallback';
    }

    return hasSupabaseConfig() ? 'supabase' : 'memory';
}
