import '../styles/index.css'
import Footer from '@/components/footer'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>3-5-2</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
