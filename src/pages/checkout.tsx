import { CheckoutForm } from '../components/CheckoutForm'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

export default function Home() {
  // stripePromiseを作成してElementsに流す
  const stripeApiKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  const stripePromise = loadStripe(stripeApiKey)

  return (
    <div>
      <h2>Stripe Checkout Form</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}
