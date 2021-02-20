import { NextApiRequest, NextApiResponse } from "next"
// サーバーで使うSDK
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // 決済する金額を受け取る
  const value = req.body.amount

  // intentは支払いフローを定義するオブジェクト
  const paymentIntent = await stripe.paymentIntents.create({
    amount: value,
    currency: "jpy",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  })

  // intentのsecretをクライアントがstripeに送るとintentが実行される
  res.status(200).json({ client_secret: paymentIntent.client_secret })
}
