import { getSessionFromRequest } from '@/lib/adminAuth';
import { getContent, saveContent, isAllowedPage } from '@/lib/content';

async function getContentFromGitHub(page) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    // env vars not configured — fall back to disk (build-time snapshot)
    return getContent(page);
  }

  const filePath = `content/${page}.json`;
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
  };

  const res = await fetch(apiBase, { headers });
  if (!res.ok) return getContent(page); // fall back on error
  const fileData = await res.json();
  const raw = Buffer.from(fileData.content, 'base64').toString('utf-8');
  return JSON.parse(raw);
}

async function saveContentViaGitHub(page, data) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    throw new Error(`Missing env vars — TOKEN:${!!token} OWNER:${!!owner} REPO:${!!repo}`);
  }

  const filePath = `content/${page}.json`;
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  const newContent = Buffer.from(JSON.stringify(data, null, 2), 'utf-8').toString('base64');

  // Try to get the existing file SHA (needed for updates)
  const getRes = await fetch(apiBase, { headers });
  let sha;
  if (getRes.ok) {
    const fileData = await getRes.json();
    sha = fileData.sha;
  } else if (getRes.status !== 404) {
    const errBody = await getRes.text();
    throw new Error(`GitHub GET failed ${getRes.status}: ${errBody}`);
  }
  // If 404, sha remains undefined — GitHub will create the file

  const putRes = await fetch(apiBase, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: `Update ${page} content via admin panel`,
      content: newContent,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!putRes.ok) {
    const errBody = await putRes.text();
    throw new Error(`GitHub PUT failed ${putRes.status}: ${errBody}`);
  }
}

export default async function handler(req, res) {
  const { page } = req.query;

  if (!isAllowedPage(page)) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (req.method === 'GET') {
    const isVercel = !!process.env.VERCEL;
    const content = isVercel ? await getContentFromGitHub(page) : getContent(page);
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
      console.error('[admin save error]', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).end();
}
