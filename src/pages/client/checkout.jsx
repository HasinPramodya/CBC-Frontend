import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {clearCart} from "../../utills/cart.js";

export default function CheckoutPage() {
  const location = useLocation();
  const [cartRefersh, setCartRefresh] = useState(false);
  const [cart, setCart] = useState(location.state.items);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const navigate = useNavigate();

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });

    return total;
  }

  function getTotalForLabelPrice() {
    let getTotalForLabelPrice = 0;
    cart.forEach((item) => {
      getTotalForLabelPrice += item.labelPrice * item.quantity;
    });

    return getTotalForLabelPrice;
  }

  function placeOrder() {
    const order = {
      email: email,
      address: address,
      phoneNo: phoneNo,
      billItem: [],
    };

    for (let i = 0; i < cart.length; i++) {
      order.billItem[i] = {
        productID: cart[i].productId,
        quantity: cart[i].quantity,
      };
    }

    const token = localStorage.getItem("token");
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/order", order, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        toast.success("Order placed successfully");
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Order placed Failed");
      });
  }
  return (
    <>
      <div className="w-full h-full flex justify-center item-center p-[40px]">
        <div className="w-full lg:w-[700px]">
          {cart.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full lg:h-[100px] bg-white shadow-2xl my-[5px] flex lg:flex-row flex-col justify-between items-center relative"
              >
                <button
                  className={
                    "absolute right-4 lg:right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer"
                  }
                  onClick={() => {
                    const newCart = cart.filter(
                      (product) => product.productId !== item.productId
                    );
                    setCart(newCart);
                    setCartRefresh(!cartRefersh);
                  }}
                >
                  <Trash2></Trash2>
                </button>
                <img
                  src={item.image}
                  className="h-[100px] lg:h-full aspect-square object-cover"
                />
                <div className="h-full max-[300px] w-[300px] overflow-hidden">
                  <h1 className="text-xl font-bold">{item.name}</h1>
                  <h2 className="text-xl text-gray-500">
                    {item.altNames.join(" | ")}
                  </h2>
                  <h2 className="text-xl text-gray-500">
                    {item.price.toFixed(2)}
                  </h2>
                </div>

                <div className="h-full w-[100px] flex justify-center items-center">
                  <button
                    className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                    onClick={() => {
                      const newCart = cart;
                      newCart[index].quantity -= 1;
                      if (newCart[index].quantity <= 0) {
                        newCart[index].quantity = 1;
                        setCart(newCart);
                        setCartRefresh(!cartRefersh);
                      }
                      setCartRefresh(!cartRefersh);
                    }}
                  >
                    -
                  </button>
                  <h1 className="text-xl font-bold">{item.quantity}</h1>
                  <button
                    className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                    onClick={() => {
                      const newCart = cart;
                      newCart[index].quantity += 1;
                      if (newCart[index].quantity <= 0) {
                        newCart[index].quantity = 1;
                        setCart(newCart);
                        setCartRefresh(!cartRefersh);
                      }

                      setCartRefresh(!cartRefersh);
                    }}
                  >
                    +
                  </button>
                </div>

                <div className="h-full w-[100px] flex justify-center items-center">
                  <h1 className="text-xl font-bold w-full text-end pr-2">
                    LKR: {(item.price * item.quantity).toFixed(2)}
                  </h1>
                </div>
              </div>
            );
          })}
          <div className="w-full  flex justify-end items-center">
            <h1 className="w-[100px]  text-xl text-end pr-2">Total</h1>
            <h1 className="w-[100px]  text-xl text-end pr-2">
              {getTotalForLabelPrice().toFixed(2)}
            </h1>
          </div>
          <div className="w-full  flex justify-end items-center">
            <h1 className="w-[100px]  text-xl text-end pr-2">Discount</h1>
            <h1 className="w-[100px]  border-b-[2px] text-xl text-end pr-2">
              {(getTotalForLabelPrice() - getTotal()).toFixed(2)}
            </h1>
          </div>
          <div className="w-full flex justify-end items-center">
            <h1 className="w-[100px]  text-xl text-end pr-2">Net Total</h1>
            <h1 className="w-[100px]  text-xl text-end pr-2 border-b-[4px] border-double">
              {getTotal().toFixed(2)}
            </h1>
          </div>
          <div>
            <div  className="w-full  flex justify-end">
              <h1 className="w-[100px] text-xl  text-end pr-2">Email</h1>
              <input
                type="text"
                placeholder="Address"
                className="w-[200px] text-xl border-b-[2px] text-end pr-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full  flex justify-end" >
              <h1 className="w-[100px] text-xl  text-end pr-2">Phone Number</h1>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-[200px] text-xl border-b-[2px] text-end pr-2"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="w-full  flex justify-end" >
              <h1 className="w-[100px] text-xl  text-end pr-2">Address</h1>
              <input
                type="text"
                placeholder="Address"
                className="w-[200px] text-xl border-b-[2px] text-end pr-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex justify-end mt-4">
            <button
              className="w-[170px] text-xl text-center shadow pr-2 bg-pink-400 text-white h-[40px] rounded-xl cursor-pointer"
              onClick={() => {
                placeOrder();
                clearCart();
              }}

            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
