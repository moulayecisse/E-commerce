import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }

    console.warn(cart);
  }, []);

  return (
    <div className="container m-4">
      <div>
        <h1>Cart</h1>
        <ul>
          {Object.values(cart).map((item, key) => (
            <li key={key}>
              {item.id} - {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div class="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              <>
                {cart.map((item, key) => (
                  <>
                    <tr>
                      <th scope="row">{key + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  </>
                ))}
              </>
            ) : (
              <>
                <tr>
                  <td colSpan="4">No items in cart</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
