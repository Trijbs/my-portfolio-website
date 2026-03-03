import { createClient } from '@supabase/supabase-js';

const MAX_EVENTS = 10000;
const SUPABASE_BATCH_SIZE = 1000;
const DEFAULT_TABLE = 'analytics_events';

let memoryEvents = [];
let supabaseClient = null;

function hasSupabaseConfig() {
    return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function getSupabaseTable() {
    return process.env.SUPABASE_ANALYTICS_TABLE || DEFAULT_TABLE;
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
        throw new Error(`Supabase query failed: ${error.message}`);
    }

    return Array.isArray(data) ? data.map(parseStoredEvent).filter(Boolean) : [];
}

export async function appendAnalyticsEvent(event) {
    const normalized = normalizeEvent(event);

    if (!hasSupabaseConfig()) {
        memoryEvents.unshift(normalized);
        memoryEvents = memoryEvents.slice(0, MAX_EVENTS);
        return;
    }

    const { error } = await getSupabaseClient()
        .from(getSupabaseTable())
        .upsert(buildSupabaseRow(normalized), {
            onConflict: 'id'
        });

    if (error) {
        throw new Error(`Supabase write failed: ${error.message}`);
    }
}

export async function readAnalyticsEvents(limit = 100, offset = 0) {
    if (!hasSupabaseConfig()) {
        return memoryEvents.slice(offset, offset + limit);
    }

    return readSupabaseEvents(limit, offset);
}

export async function readAllAnalyticsEvents() {
    if (!hasSupabaseConfig()) {
        return [...memoryEvents];
    }

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
}

export async function countAnalyticsEvents() {
    if (!hasSupabaseConfig()) {
        return memoryEvents.length;
    }

    const { count, error } = await getSupabaseClient()
        .from(getSupabaseTable())
        .select('id', { count: 'exact', head: true });

    if (error) {
        throw new Error(`Supabase count failed: ${error.message}`);
    }

    return Number(count) || 0;
}

export function getAnalyticsStorageMode() {
    return hasSupabaseConfig() ? 'supabase' : 'memory';
}
