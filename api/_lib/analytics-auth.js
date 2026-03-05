import crypto from 'node:crypto';

export const ANALYTICS_AUTH_COOKIE = 'analytics_admin';

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
const AUTH_SALT = process.env.ANALYTICS_AUTH_SALT || 'analytics-auth-cookie-v1';

function getPassword() {
    return process.env.ANALYTICS_ADMIN_PASSWORD || '';
}

function buildToken(password) {
    return crypto.scryptSync(password, AUTH_SALT, 32).toString('hex');
}

function safeTokenEqual(left = '', right = '') {
    const leftBuffer = Buffer.from(left);
    const rightBuffer = Buffer.from(right);

    if (leftBuffer.length !== rightBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function parseCookies(headerValue = '') {
    return headerValue
        .split(';')
        .map((part) => part.trim())
        .filter(Boolean)
        .reduce((cookies, part) => {
            const separatorIndex = part.indexOf('=');
            if (separatorIndex === -1) {
                return cookies;
            }

            const key = part.slice(0, separatorIndex).trim();
            const value = part.slice(separatorIndex + 1).trim();
            cookies[key] = decodeURIComponent(value);
            return cookies;
        }, {});
}

function setCookie(res, value, maxAge) {
    const secure = process.env.NODE_ENV === 'production' ? ' Secure;' : '';
    res.setHeader(
        'Set-Cookie',
        `${ANALYTICS_AUTH_COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge};${secure}`
    );
}

export function isAnalyticsAuthConfigured() {
    return Boolean(getPassword());
}

export function validateAnalyticsPassword(password) {
    const configuredPassword = getPassword();
    return Boolean(configuredPassword && password && configuredPassword === password);
}

export function isAnalyticsAuthorized(req) {
    const password = getPassword();
    if (!password) {
        return false;
    }

    const cookies = parseCookies(req.headers?.cookie || '');
    return safeTokenEqual(cookies[ANALYTICS_AUTH_COOKIE], buildToken(password));
}

export function setAnalyticsAuthCookie(res) {
    const password = getPassword();
    if (!password) {
        return;
    }

    setCookie(res, buildToken(password), WEEK_IN_SECONDS);
}

export function clearAnalyticsAuthCookie(res) {
    setCookie(res, '', 0);
}
