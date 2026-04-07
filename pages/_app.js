import '@/styles/globals.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/Components/layout/Navbar';
import Footer from '@/Components/layout/Footer';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [globalContent, setGlobalContent] = useState(null);
  const isAdminPage = router.pathname.startsWith('/admin');

  useEffect(() => {
    if (!isAdminPage) {
      fetch('/api/admin/content/global')
        .then(r => r.json())
        .then(data => setGlobalContent(data))
        .catch(() => {});
    }
  }, [isAdminPage]);

  if (isAdminPage) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Navbar globalContent={globalContent} />
      <Component {...pageProps} />
      <Footer globalContent={globalContent} />
    </>
  );
}
