import { CheckoutForm } from '../components/CheckoutForm'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Link from "next/link"

export default function Home() {
  const stripeApiKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  const stripePromise = loadStripe(stripeApiKey)

  return (
    <div>
      <Link href='/checkout'><a>Checkout</a></Link>
      <Link href='/subscription'><a>Subscription</a></Link>
    </div>
  )
}
