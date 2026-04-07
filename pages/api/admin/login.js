import { createSession, setSessionCookie } from '@/lib/adminAuth';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body || {};

  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'greymatters2024';

  if (!username || !password || username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const session = createSession();
  setSessionCookie(res, session);
  return res.json({ success: true });
}
