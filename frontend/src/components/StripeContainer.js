import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const PUBLIC_KEY =
  "pk_test_51LQpZlKB1RgBHZAKwdvY5b8TWngvXpLpGiqC8lpAk9Y32bxqaqx0Ok8k4hbbttV0bOI5XmTEX7Ky327D5aWozQAS00LakGKaq1";
loadStripe(PUBLIC_KEY);
