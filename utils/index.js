export function createPageUrl(path) {
  // Always return a valid href for Next.js <Link>
  if (!path || typeof path !== 'string') {
    return '/';
  }

  const cleaned = path
    .trim()
    .toLowerCase()
    .replace(/^\//, '')
    .replace(/\s+/g, '-');

  // 🔑 Next.js rule: Home = /
  if (cleaned === 'home') {
    return '/';
  }

  return '/' + cleaned;
}
