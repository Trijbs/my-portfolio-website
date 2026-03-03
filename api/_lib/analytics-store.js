const EVENTS_KEY = 'portfolio:analytics:events';
const MAX_EVENTS = 10000;

let memoryEvents = [];

function hasRedisConfig() {
    return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

async function executeRedis(command) {
    const response = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(command)
    });

    const payload = await response.json();

    if (!response.ok || payload.error) {
        throw new Error(payload.error || `Upstash request failed with status ${response.status}`);
    }

    return payload.result;
}

function parseStoredEvent(item) {
    if (typeof item !== 'string') {
        return null;
    }

    try {
        return JSON.parse(item);
    } catch (error) {
        return null;
    }
}

async function readRedisEvents(start, stop) {
    const result = await executeRedis(['LRANGE', EVENTS_KEY, String(start), String(stop)]);
    return Array.isArray(result) ? result.map(parseStoredEvent).filter(Boolean) : [];
}

export async function appendAnalyticsEvent(event) {
    if (!hasRedisConfig()) {
        memoryEvents.unshift(event);
        memoryEvents = memoryEvents.slice(0, MAX_EVENTS);
        return;
    }

    await executeRedis(['LPUSH', EVENTS_KEY, JSON.stringify(event)]);
    await executeRedis(['LTRIM', EVENTS_KEY, '0', String(MAX_EVENTS - 1)]);
}

export async function readAnalyticsEvents(limit = 100, offset = 0) {
    if (!hasRedisConfig()) {
        return memoryEvents.slice(offset, offset + limit);
    }

    return readRedisEvents(offset, offset + limit - 1);
}

export async function readAllAnalyticsEvents() {
    if (!hasRedisConfig()) {
        return [...memoryEvents];
    }

    return readRedisEvents(0, MAX_EVENTS - 1);
}

export async function countAnalyticsEvents() {
    if (!hasRedisConfig()) {
        return memoryEvents.length;
    }

    const total = await executeRedis(['LLEN', EVENTS_KEY]);
    return Number(total) || 0;
}

export function getAnalyticsStorageMode() {
    return hasRedisConfig() ? 'upstash-redis' : 'memory';
}
