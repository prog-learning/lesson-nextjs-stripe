import React from 'react'
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"

export const CheckoutForm = () => {
  const [amount, setAmount] = React.useState<any>(100)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async event => {
    event.preventDefault()

    // intentを作るエンドポイントに決済したい金額を送る
    const res = await fetch("/api/pay", {
      method: "post",
      body: JSON.stringify({ amount: amount }),
      headers: { "Content-Type": "application/json" },
    })
    const data = await res.json()
    const secret = data.client_secret

    const card = elements.getElement(CardElement) // tokenを使ってintentを実行する

    const result = await stripe.confirmCardPayment(secret, {
      payment_method: {
        // FYI: payment_method (https://stripe.com/docs/api/payment_methods)
        card: card,
        billing_details: {
          name: "user name",
        },
      },
    })

    if (result.error) {
      /**
       * 決済の失敗
       * * api_connection_error
       * * api_error
       * * authentication_error
       * * card_error
       * * and so on...
       */
      console.log(result.error.message)
    } else {
      if (result.paymentIntent.status === "succeeded") {
        /**
         * 決済に成功したときの処理をこのブロックに書く
         */
        alert("payment success!!")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ marginTop: 10, marginBottom: 10, display: "block" }}>
        金額（日本円）
      </label>
      <input name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <label style={{ marginTop: 10, marginBottom: 10, display: "block" }}>
        カード情報
        <CardElement options={{ hidePostalCode: true }} />
      </label>
      <p>↓テスト用クレジットカード情報↓</p>
      <ul>
        <li>番号: 4111111111111111</li>
        <li>有効期限: 02/25 (現在より後ならいつでmお)</li>
        <li>CVC: 111 (3桁ならなんでも)</li>
      </ul>
      <button type="submit">支払う</button>
    </form>
  )
}
