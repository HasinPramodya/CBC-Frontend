import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../component/loader";
import { CircleX } from 'lucide-react';

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [isOrderLoaded, setOrderLoaded] = useState(false);
  const [isModelDisplayed,setModelDisplayed] = useState(false)
  const [displayingOrder,setDispalyingOrder] = useState(null)

  useEffect(() => {
    if (!isOrderLoaded) {
      const token = localStorage.getItem("token");
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/order/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setOrders(res.data.orders);
          setOrderLoaded(true);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Orders can not get");
        });
    }
  }, [isOrderLoaded]);

  function changeOrderStatus(OrderId,status){
     axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/"+OrderId, {
      status : status,
     },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
     }).then(
         toast.success("Order Status Updated Successfully"),
         setOrderLoaded(false)
         
         

     ).catch(
      (error)=>{
      console.log(error);
      toast.error("Can not updated the Order Status")
      }
     )

     
  }

  return (
    <>
      <div className="w-full h-screen">
        {isOrderLoaded ? (
          <div className="w-full h-full">
            <table className="w-full">
            <thead>
                <tr>
                <th>Order ID</th>
                <th>Customer Email</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Total</th>
                <th>Date</th>
                <th>Details</th>
                </tr>
            </thead>
            <tbody>    
            {orders.map((order) => {
              return (
                <tr
                  key={order.OrderID}
                  className="border-b-2 border-gray-300 hover:bg-gray-100"
                >
                    <td className="p-2">{order.OrderID}</td>
                    <td className="p-2">{order.email}</td>
                    <td className="p-2">{order.address}</td>
                    <td className="p-2">{order.phoneNo}</td>
                    <td className="p-2">
                      <select value={order.status} onChange={(e)=>{
                        changeOrderStatus(order.OrderID,e.target.value)
                      }}>
                        <option value={"Pending"}>Pending</option>
                        <option value={"Delivered"}>Delivered</option>
                        <option value={"Cancelled"}>Cancelled</option>
                        <option value={"Processing"}>Processing</option>

                      </select>
                    </td>
                    <td className="p-2">{order.total.toFixed(2)}</td>
                    <td className="p-2">{ new Date(order.date).toDateString()}</td>
                    <td className="p-2">
                      <button className="bg-gray-700 text-white p-2 rounded-lg" onClick={()=>{
                        setModelDisplayed(true)
                        setDispalyingOrder(order)
                      }}>Details</button>
                    </td>
                </tr>
              );
            })}
            </tbody>    
            </table>
            {
                isModelDisplayed && 
                <div className="fixed bg-[##00000070] w-full h-full top-0 left-0 flex justify-center items-center">
                  <div className="w-[600px] h-[600px] max-w-[600px] max-h[600px]  bg-white relative">
                    <div className="w-full h-[150px]">
                      <h1 className="text-sm font-bold  p-2">Order ID: {displayingOrder.OrderID}</h1>
                      <h1 className="text-sm font-bold  p-2"> Order Date: {new Date(displayingOrder.date).toDateString()}</h1>
                      <h1 className="text-sm font-bold  p-2">Order Status: {displayingOrder.status}</h1>
                      <h1 className="text-sm font-bold  p-2">Order Total: {displayingOrder.total.toFixed(2)}</h1>
                    </div>
                    <div className="w-full h-[450px] max-h-[450px] overflow-y-scroll">

                      {
                        displayingOrder.billItem.map(
                          (item,index)=>{
                            return(
                              <div key={index} className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-center items-center relative">
                                <img src={item.image} className="h-full aspect-square object-cover"/>
                                <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                  <h1 className="text-xl front-bold ">{item.productName}</h1>
                                  <h1 className="text-lg text-gray-500 ">LKR: {item.price.toFixed(2)}</h1>
                                  <h1 className="text-lg text-gray-500 ">Quantity{item.quantity}</h1>

                                </div>

                              </div>
                            )
                          }
                        )
                      }

                    </div>
                    <button className="w-[40px] h-[40px] absolute right-[-20px] top-[-20px] rounded-full bg-white shadow shadow-black flex justify-center items-center" onClick={()=>{
                      setModelDisplayed(false)
                    }}>
                     <CircleX />
                    </button>
                  </div>
                </div>
            }
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
