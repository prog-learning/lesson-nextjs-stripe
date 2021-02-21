import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { StripeCardElementOptions } from '@stripe/stripe-js';
import Router from "next/router";

export const SubscriptionCheckoutForm: React.FC = (props: any) => {
  console.log(props)
  const [isLoading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    setLoading(true);
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        // address: {
        //   city: 'yokohama',
        //   line1: '3333',
        //   postal_code: '123',
        //   state: '...state'
        // },
        email: "janedoe@example.com",
        name: 'my_name',
        phone: "555-555-5555"
      }
    });
    await handleStripePaymentMethod(result);
    setLoading(false);
  };

  const handleStripePaymentMethod = async result => {
    if (result.error) {
      alert("Error: " + result.error.message);
    } else {
      // const response = await fetch("api/create-customer", {
      const response = await fetch("api/subscription-api", {
        method: "POST",
        mode: "same-origin",
        body: JSON.stringify({
          paymentMethodId: result.paymentMethod.id
        })
      });

      const subscription = await response.json();
      handleSubscription(subscription);
    }
  };

  const handleSubscription = subscription => {
    console.log(subscription)
    const { latest_invoice } = subscription;
    console.log(latest_invoice)
    const { payment_intent } = latest_invoice;

    if (payment_intent) {
      const { client_secret, status } = payment_intent;

      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            // The card was declined (i.e. insufficient funds, card has expired, etc)
            alert("Error" + result.error.message);
          } else {
            // Success!
            alert("Success!!");
          }
        });
      } else {
        // No additional information was needed
        alert("Success!!");
      }
    } else {
      console.log(`handleSubscription:: No payment information received!`);
    }
  };

  const cardOptions: StripeCardElementOptions = {
    hideIcon: false,
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        iconColor: "#1890ff",
        color: "rgba(0, 0, 0, 0.65)",
        fontWeight: "500",
        fontFamily: "Segoe UI, Roboto, Open Sans, , sans-serif",
        fontSize: "15px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#999" }
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee"
      }
    }
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div>
        <input placeholder="Jane Doe" />
      </div>
      <div >
        <input placeholder="1234 Almond Ave" />
      </div>
      <div>
        <div >
          <input placeholder="San Bernardino" />
        </div>
        <div >
          <input placeholder="CA" />
        </div>
        <div >
          <input placeholder="92401" />
        </div>
      </div>
      <div>
        <CardElement options={cardOptions} />
      </div>
      <button
        type="submit"
        className="checkout-button"
        disabled={!stripe}
      >
        Submit
      </button>
      {isLoading && <h2>ロード中.......</h2>}
    </form>
  );
};
