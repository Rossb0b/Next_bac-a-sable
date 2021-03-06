import React from "react"
import Layout from "components/layout/Layout"


const Index: React.FC = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Index</h1>
      </div>
      <style jsx>{`
        h1 {
          color: red;
          text-align: center;
        }
      `}</style>
    </Layout>
  )
}

export default Index
