import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

const ALLOWED_PAGES = [
  'global', 'home', 'courses', 'about', 'immigration',
  'successstories', 'blog', 'howitworks', 'contact', 'custompages'
];

export function isAllowedPage(page) {
  return ALLOWED_PAGES.includes(page);
}

export function getContent(page) {
  if (!isAllowedPage(page)) return {};
  try {
    const filePath = path.join(contentDir, `${page}.json`);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export function saveContent(page, data) {
  if (!isAllowedPage(page)) throw new Error('Invalid page');
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  const filePath = path.join(contentDir, `${page}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
