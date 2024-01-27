import React from 'react'
import { PageWrapper } from "../../components/pageWrapper/PageWrapper"
import "./about.scss"


export default function About() {
  return (
    <PageWrapper className='container-about animate-left f-column'>
      <h1>About</h1>
      <h3>
        Welcome to the product expiry tracker management App.<br></br>
        This application is designed to help you manage and track products and  expiry date for business products.
      </h3>
      <ol className="text-font">
        <li>
          The product expiry tracker management App is a comprehensive solution for
          businesses of all sizes to manage their products efficiently.
        </li>
        <li>
          {" "}
          The app allows Store keepers to easily calculate and process Product manufactured date and expiry date,
           and alerting them of the products  they have in storage that are expired.
        </li>
        <li>
          With built-in date tracking features, the app ensures that
          businesses stay up-to-date with the products shelflife to avoid
          bad customer service.
        </li>
      </ol>
     
    </PageWrapper>
  )
}
