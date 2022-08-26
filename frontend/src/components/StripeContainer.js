import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51LTQfUF3KkRWIEfi4gqpRzC4696146OLqJavH4rGv2eqdJboUArUcjqWpfUYd7dKx6Qt5wVum6FEMqYF79KX0elJ00LCynCeea";
const stripeTestPromise = loadStripe(PUBLIC_KEY);
const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
