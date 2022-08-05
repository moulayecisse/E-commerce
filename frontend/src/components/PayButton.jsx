import axios from "axios";
import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post(`https://localhost:8000/checkout`, {
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
