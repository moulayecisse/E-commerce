import axios from "axios";
import AuthService from "../services/auth.service";

const PayButton = ({ cartItems }) => {
  const user = AuthService.getCurrentUser();
  const handleCheckout = () => {
    axios
      .post(`http://localhost:5000/api/stripe/create-checkout-session`, {
        cartItems,
        userId: user.id,
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
