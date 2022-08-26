import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { clearCart, getTotals } from "../Routes/User/slices/cartSlice";
import axios from "axios";
import { v4 as uuid } from "uuid";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart.cartItems, "cartdata");

  //test data
  for (let i = 0; i < cart.cartItems.length; i++) {
    console.log(cart.cartItems);
  }

  useEffect(() => {
    getUser();
  }, []);

  const token = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: { Authorization: `Bearer ${token.token}` },
  };
  const getUser = async () => {
    try {
      const res = await axios.get("https://127.0.0.1:8000/api/me", config);
      console.log(res.data);
      const userId = res.data.id;
      saveCommand(userId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const saveCommand = async (userId) => {
    const unique_id = uuid();
    const reference = unique_id.slice(0, 8);
    const event = new Date(Date.now());
    const date = event.toISOString();
    const user = "api/users/" + userId;
    const totalPrice = parseInt(cart.cartTotalAmount);
    const order = { reference, user, date, totalPrice };

    console.log(order, "dataaa");
    try {
      const resp = await axios.post("https://localhost:8000/api/orders", order);
      const ordersId = resp.data.id;
      console.log(ordersId, "ordersId");
      saveCommandDetails(ordersId);
      console.log(resp, "paased");
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  const saveCommandDetails = async (ordersId) => {
    for (let i = 0; i < cart.cartItems.length; i++) {
      const orders = "api/orders/" + ordersId;
      const product = "api/products/" + cart.cartItems[i].id;
      const quantity = cart.cartItems[i].cartQuantity;
      const price = parseInt(cart.cartItems[i].price);

      const ordersDetails = { orders, product, price, quantity };
      try {
        const resp = await axios.post(
          "https://localhost:8000/api/orders_details",
          ordersDetails
        );
        console.log(resp, "paased");
      } catch (error) {
        if (error.response) {
          console.log(error);
        }
      }
    }
  };
  return (
    <Container>
      <h2>Checkout Successful</h2>
      <p>Your order might take some time to process.</p>
      <p>Check your order status at your profile after about 10mins.</p>
      <p>
        Incase of any inqueries contact the support at{" "}
        <strong>support@ecommerce.com</strong>
      </p>
    </Container>
  );
};

export default CheckoutSuccess;

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`;
