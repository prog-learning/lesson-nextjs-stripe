import '../styles/globals.css'
import Link from "next/link"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <br />
      { !(window.location.pathname === '/') && <Link href="/"><a>HOME</a></Link>}
    </>
  )
}

export default MyApp
