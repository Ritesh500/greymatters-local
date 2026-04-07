import { getSessionFromRequest } from '@/lib/adminAuth';
import { getContent, saveContent, isAllowedPage } from '@/lib/content';

export default function handler(req, res) {
  const { page } = req.query;

  if (!isAllowedPage(page)) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (req.method === 'GET') {
    const content = getContent(page);
    return res.json(content);
  }

  if (req.method === 'POST') {
    if (!getSessionFromRequest(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      saveContent(page, req.body);
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).end();
}
