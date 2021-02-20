import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { SubscriptionCheckoutForm } from "../components/SubscriptionCheckoutForm";

const CheckoutPage = () => {
  const stripeApiKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  const stripePromise = loadStripe(stripeApiKey);
  return (
    <div className="stripe-form">
      <Elements stripe={stripePromise}>
        <SubscriptionCheckoutForm />
      </Elements>
      <div className="order-summary">
        <div>
          <h1>Order Summary</h1>
          <div className="order-item">
            <h3>Standard subscription</h3>
          </div>
          <div className="order-item-price">
            <p>$10.00 monthly</p>
          </div>
        </div>
        <hr></hr>
        <h3>Today's charge: $10.00</h3>
      </div>
    </div>
  );
};

export default CheckoutPage;
