import React from 'react'
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from '@stripe/stripe-js'

export const CheckoutForm = () => {
  const [amount, setAmount] = React.useState('100')
  const [loading, setLoading] = React.useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    if (!RegExp(/^[1-9][0-9]*$/).test(amount)) return alert('金額に誤りがあります')
    setLoading(true)
    // intentを作るエンドポイントに決済したい金額を送る
    const res = await fetch("/api/checkout-api", {
      method: "post",
      body: JSON.stringify({ amount }),
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
          name: "user_name",
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
      alert(result.error.message)
      setLoading(false)
    } else {
      if (result.paymentIntent.status === "succeeded") {
        /**
         * 決済に成功したときの処理をこのブロックに書く
         */
        setLoading(false)
        alert("payment success!!")
      }
    }
  }

  const cardElementOptions: StripeCardElementOptions = {
    hidePostalCode: true, // 郵便番号の入力の有無
    hideIcon: false, // iconの表示 非表示
    iconStyle: "solid", // solid or default
    /**
     * スタイルはここを参考
     * https://stripe.com/docs/js/appendix/style
     */
    style: {
      base: {
        iconColor: "#1890ff",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        "::placeholder": { color: "#999" },
      },
      invalid: {
        iconColor: "tomato",
        color: "tomato",
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='box'>
        <h3>テスト用クレジットカード情報</h3>
        <ul>
          <li>番号: 4242 4242 4242 4242</li>
          <li>有効期限: 12/99 (過去になっていなければOK)</li>
          <li>CVC: 111 (3桁ならなんでもOK)</li>
        </ul>
        <p>ようは,42を交互に連打していれば入力完了します</p>
      </div>
      <div className='box'>
        <label htmlFor='amount'>決済額（日本円）</label>
        <br />
        <input id='amount' name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <br />
        <br />
        <label htmlFor='cardInfo'>カード情報</label>
        <br />
        <div className='box'>
          <CardElement options={cardElementOptions} />
        </div>
        <br />
        <button type="submit">支払う</button>
        {loading && <span>...通信中</span>}
      </div>
    </form>
  )
}
