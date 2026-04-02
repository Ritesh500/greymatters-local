import '@/styles/globals.css'
import Navbar from '@/Components/layout/Navbar'
import Footer from '@/Components/layout/Footer'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
