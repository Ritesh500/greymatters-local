import { getSessionFromRequest } from '@/lib/adminAuth';
import { getContent, saveContent, isAllowedPage } from '@/lib/content';

async function saveContentViaGitHub(page, data) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    throw new Error('GitHub env vars not set (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO)');
  }

  const filePath = `content/${page}.json`;
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  // Get the current file SHA (required by GitHub API to update a file)
  const getRes = await fetch(apiBase, { headers });
  if (!getRes.ok) throw new Error(`GitHub GET failed: ${getRes.status}`);
  const { sha } = await getRes.json();

  // Commit the updated content
  const newContent = Buffer.from(JSON.stringify(data, null, 2), 'utf-8').toString('base64');
  const putRes = await fetch(apiBase, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: `Update ${page} content via admin panel`,
      content: newContent,
      sha,
    }),
  });

  if (!putRes.ok) {
    const err = await putRes.json();
    throw new Error(err.message || `GitHub PUT failed: ${putRes.status}`);
  }
}

export default async function handler(req, res) {
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
      const isVercel = !!process.env.VERCEL;
      if (isVercel) {
        await saveContentViaGitHub(page, req.body);
      } else {
        saveContent(page, req.body);
      }
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).end();
}
