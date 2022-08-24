import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51LQpZlKB1RgBHZAKwdvY5b8TWngvXpLpGiqC8lpAk9Y32bxqaqx0Ok8k4hbbttV0bOI5XmTEX7Ky327D5aWozQAS00LakGKaq1";
const stripeTestPromise = loadStripe(PUBLIC_KEY);
const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
