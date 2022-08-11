import axios from "axios";

import { url } from "./api";

const PayButton = ({ cartItems }) => {
  const handleCheckout = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
      })
      .then((response) => {
        window.location.href = response.data.url;
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;
