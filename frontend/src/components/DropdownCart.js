import "../components/styles/cart.css";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import PayButton from "../components/PayButton";
import { useNavigate } from "react-router-dom";

import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../Routes/User/slices/cartSlice";
import AuthService from "../services/auth.service";

const user = AuthService.getCurrentUser();

export default function Example() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-normal text-gray-900">
                          {" "}
                          Shopping cart{" "}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="cart-items">
                          {cart.cartItems.map((cartItem) => (
                            <div className="cart-item" key={cartItem.id}>
                              <div className="cart-product">
                                {cartItem.image && (
                                  <img
                                    src={`https://localhost:8000${cartItem.image.contentUrl}`}
                                    alt={cartItem.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                )}
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-normal text-gray-900">
                                    <h3>
                                      <a href=""> {cartItem.name} </a>
                                    </h3>
                                    <p className="ml-4">{cartItem.price}</p>
                                  </div>
                                  <div className="cart-product-quantity">
                                    <button
                                      onClick={() =>
                                        handleDecreaseCart(cartItem)
                                      }
                                    >
                                      -
                                    </button>
                                    <div className="count">
                                      {cartItem.cartQuantity}
                                    </div>
                                    <button
                                      onClick={() => handleAddToCart(cartItem)}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between ">
                                  <p className="text-gray-500">
                                    Qty {cartItem.quantity}
                                  </p>

                                  {/* <div className="cart-product-quantity">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleRemoveFromCart(cartItem)
                                      }
                                      className="font-normal text-indigo-600 hover:text-indigo-500"
                                    >
                                      Remove
                                    </button>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-normal text-gray-900">
                        <p>Subtotal</p>
                        <p>${cart.cartTotalAmount}</p>
                      </div>
                      <p>Taxes and shipping calculated at checkout</p>
                      {user ? (
                        <PayButton cartItems={cart.cartItems} />
                      ) : (
                        <button
                          className="cart-login"
                          onClick={() => navigate("/login")}
                        >
                          Login to Check out
                        </button>
                      )}
                      <div className="mt-6 flex justify-center text-center  text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-normal text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
