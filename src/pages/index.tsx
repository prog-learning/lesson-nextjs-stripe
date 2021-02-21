import Link from "next/link"

export default function Home() {

  return (
    <div>
      <h1>Lesson Stripe with TypeScript & Next.js</h1>
      <h2><Link href='/checkout'><a>Checkout</a></Link></h2>
      <h2><Link href='/subscription'><a>Subscription</a></Link></h2>
    </div>
  )
}
