import { getSessionFromRequest } from '@/lib/adminAuth';

export default function handler(req, res) {
  const authenticated = getSessionFromRequest(req);
  return res.json({ authenticated });
}
