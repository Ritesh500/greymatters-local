import crypto from 'crypto';

const SECRET = process.env.ADMIN_SECRET || 'gm-admin-secret-change-in-production';
const COOKIE_NAME = 'gm_admin_session';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours in seconds

export function createSession() {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + COOKIE_MAX_AGE * 1000;
  const data = JSON.stringify({ token, expires });
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('hex');
  return Buffer.from(JSON.stringify({ data, sig })).toString('base64');
}

export function verifySession(sessionStr) {
  try {
    const decoded = Buffer.from(sessionStr, 'base64').toString();
    const { data, sig } = JSON.parse(decoded);
    const expectedSig = crypto.createHmac('sha256', SECRET).update(data).digest('hex');
    if (sig !== expectedSig) return false;
    const { expires } = JSON.parse(data);
    return Date.now() < expires;
  } catch {
    return false;
  }
}

export function getSessionFromRequest(req) {
  const cookies = req.cookies || {};
  const session = cookies[COOKIE_NAME];
  if (!session) return false;
  return verifySession(session);
}

export function setSessionCookie(res, session) {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${session}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${COOKIE_MAX_AGE}`
  );
}

export function clearSessionCookie(res) {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
  );
}
