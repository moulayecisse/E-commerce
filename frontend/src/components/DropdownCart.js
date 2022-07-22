import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../Routes/User/slices/cartSlice";

export default function Example() {
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
                enter="transform transition ease-in-out duration-500 sm:duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-md">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-normal text-gray-800">
                          {" "}
                          Shopping cart{" "}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-gray-200">
                            {cart.cartItems.map((cartItem) => (
                              <li key={cartItem.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded border border-gray-300">
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
                                    <div className="flex justify-between text-base font-normal text-gray-800">
                                      <div>
                                        <a href=""> {cartItem.name} </a>
                                      </div>
                                      <p className="ml-4">{cartItem.price}</p>
                                    </div>
                                    <div className="flex pr-8">
                                      <span
                                        className=" rounded font-semibold hover:bg-gray-50 focus:outline-none  focus:ring-2"
                                        onClick={() =>
                                          handleDecreaseCart(cartItem)
                                        }
                                      >
                                        -
                                      </span>
                                      <input
                                        type="disabled"
                                        className=" count mx-2 h-6 w-8 rounded border  px-2 text-sm focus:outline-none"
                                        value={cartItem.cartQuantity}
                                      />
                                      <span
                                        className="font-semibold"
                                        onClick={() =>
                                          handleAddToCart(cartItem)
                                        }
                                      >
                                        +
                                      </span>
                                    </div>
                                    <p className="mt-1   text-gray-500">pp</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between  ">
                                    <p className="text-gray-500">
                                      Qty {cartItem.quantity}
                                    </p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveFromCart(cartItem)
                                        }
                                        className="text- indigo-500 hover:text- indigo-500 font-normal"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-300 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-normal text-gray-800">
                        <p>Subtotal</p>
                        <p>${cart.cartTotalAmount}</p>
                      </div>
                      <p className="mt-0.5   text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded border border-transparent bg-indigo-500 px-6 py-3 text-base font-normal text-white shadow-md hover:bg-indigo-500"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center   text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="text- indigo-500 hover:text- indigo-500 font-normal"
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
