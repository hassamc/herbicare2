import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <div>
    <SEO title="404: Not found" />
    <div class="jumbotron text-center">
      <h1 class="display-3">Thank You For Your Order!</h1>
      <p class="lead">An email containing a <strong>receipt</strong>has been sent to you.</p>
      <hr></hr>
      <p class="lead">
        <a class="btn btn-primary btn-sm" href="https://smartsupplements.ca" role="button">Continue to homepage</a>
      </p>
    </div>

  </div>
)

export default NotFoundPage
