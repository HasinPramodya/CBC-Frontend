import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isOrdersLoaded, setIsOrdersLoaded] = useState(false);
    const [isModelDisplayed, setIsModelDisplayed] = useState(false);
    const [displayingOrder, setDispalyingOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isOrdersLoaded) {
            const token = localStorage.getItem("token");
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/order/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setOrders(res.data.orders);
                    setIsOrdersLoaded(true);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Orders can not get");
                });
        }
    }, [isOrdersLoaded]);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">My Orders</h1>
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Address
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Details
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr
                                key={order.OrderID}
                                className="border-b-2 border-gray-300 hover:bg-gray-100"
                            >
                                <td className="p-2">{order.OrderID}</td>
                                <td className="p-2">{order.address}</td>
                                <td className="p-2">{order.status}</td>
                                <td className="p-2">
                                    {order.date ? new Date(order.date).toDateString() : "N/A"}
                                </td>
                                <td className="p-2">
                                    <button
                                        className="bg-gray-700 text-white px-4 py-1 rounded-lg"
                                        onClick={() => {
                                            setIsModelDisplayed(true);
                                            setDispalyingOrder(order);
                                        }}
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal for Order Details */}
                {isModelDisplayed && displayingOrder && (
                    <div className="fixed top-0 left-0 w-full h-full bg-[##00000070] bg-opacity-40 flex justify-center items-center z-50">
                        <div className="w-[600px] h-[600px] max-w-[600px] max-h-[600px] bg-white relative rounded-lg shadow-lg overflow-hidden">

                            <button
                                className="w-[40px] h-[40px] absolute right-[-15px] top-[-15px] rounded-full bg-white shadow shadow-black flex justify-center items-center"
                                onClick={() => setIsModelDisplayed(false)}
                            >
                                <CircleX />
                            </button>


                            <div className="w-full h-[150px] p-4 border-b border-gray-300">
                                <h2 className="text-xl font-bold mb-2">Order Details</h2>
                                <p><strong>Order ID:</strong> {displayingOrder.OrderID}</p>
                                <p><strong>Address:</strong> {displayingOrder.address}</p>
                                <p><strong>Status:</strong> {displayingOrder.status}</p>
                                <p><strong>Total: </strong>{displayingOrder.total.toFixed(2)}</p>
                                <p><strong>Date:</strong> {new Date(displayingOrder.date).toDateString()}</p>
                            </div>


                            <div className="w-full h-[450px] max-h-[450px] overflow-y-scroll px-4 py-2 m-2">
                                {displayingOrder.billItem.map((item, index) => (
                                    <div
                                        key={index}
                                        className="w-full h-[100px] bg-white shadow-md my-2 flex items-center border rounded-lg px-4"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.productName}
                                            className="h-full aspect-square object-cover rounded-lg mr-4"
                                        />
                                        <div className="flex flex-col justify-center">
                                            <h1 className="text-lg font-bold">{item.productName}</h1>
                                            <p className="text-gray-600">LKR: {item.price.toFixed(2)}</p>
                                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex justify-center items-center w-full h-[100px]">
                    <button className="flex items-center justify-between gap-2 bg-pink-800 text-white w-[200px] h-[50px] px-4 rounded-lg hover:bg-white hover:text-pink-800 border border-pink-800 cursor-pointer m-4" onClick={()=>{
                        navigate('/')
                    }}>
                        Back to Home page
                    </button>
                </div>
            </div>


        </>
    );
}
