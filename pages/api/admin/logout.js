import { clearSessionCookie } from '@/lib/adminAuth';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  clearSessionCookie(res);
  return res.json({ success: true });
}
