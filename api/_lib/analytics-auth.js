import crypto from 'node:crypto';

export const ANALYTICS_AUTH_COOKIE = 'analytics_admin';

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

function getPassword() {
    return process.env.ANALYTICS_ADMIN_PASSWORD || '';
}

function buildToken(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
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
    return cookies[ANALYTICS_AUTH_COOKIE] === buildToken(password);
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
