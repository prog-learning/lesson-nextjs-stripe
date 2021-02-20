import { CheckoutForm } from '../components/CheckoutForm'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

export default function Home() {
  const stripeApiKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  const stripePromise = loadStripe(stripeApiKey)

  return (
    <div style={{ padding: 24 }}>
      <h1>sadnessOjisan に年収を払ってくれる御社を探してます！</h1>
      <p>お金欲しい！！！！！！！！！！</p>
      <div style={{ maxWidth: 760 }}>
        <Elements stripe={stripePromise}>
          {" "}
          // 中身はContext
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  )
}
