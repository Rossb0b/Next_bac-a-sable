import { NextPage } from 'next'
import Layout from 'components/layout/Layout'

import CheckoutForm from 'components/stripe/checkoutForm'

const DonatePage: NextPage = () => {
  return (
    <Layout>
      <div className="page-container">
        <h1>Donate with Checkout</h1>
        <p>Donate to our project 💖</p>
        <CheckoutForm />
      </div>
    </Layout>
  )
}

export default DonatePage