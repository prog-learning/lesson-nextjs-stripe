# Lesson Next.js Stripe Checkout

参考
[https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe](https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe)

- checkout
  [https://blog.ojisan.io/how-to-stripe](https://blog.ojisan.io/how-to-stripe)
- subscription
  [https://medium.com/@andreiushakov/build-a-subscription-checkout-form-with-next-js-stripe-elements-and-antd-d5434b83bd51](https://medium.com/@andreiushakov/build-a-subscription-checkout-form-with-next-js-stripe-elements-and-antd-d5434b83bd51)

## `.env.local`を作成

API キーとシークレットを操作するときは,バージョン管理されないように`.env.local`にで設定する
Stripe の登録を済まして,テスト用の公開鍵と秘密鍵を`.env.local`にコピペ

## Stripe をインストール

`yarn add stripe @stripe/react-stripe-js @stripe/stripe-js`

- stripe
  server が使う stripe ライブラリ
- @stripe/react-stripe-js
  client が使う stripe ライブラリ
- @stripe/stripe-js
  stripe の入力フォームを作る UI キット

## TypeScript の対応

`yarn add -D typescript @types/react`

ついでに src 構成に

## Stripe と通信する関数の作成

`./utils/get-stripejs.ts`を作成

## Sessiton を作成する API を作成

`./pages/api/checkout_sessions/index.ts`を作成

それを呼び出す Component を作成
`./components/CheckoutForm.tsx`
