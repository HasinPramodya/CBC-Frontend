import { Link,Route,Routes, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaBorderAll } from "react-icons/fa";
import { SlLogout } from "react-icons/sl";
import AdminProduct from "./adminProductPage";
import AddProduct from "./adminAddProductPage";
import EditForm from "./adminEditProductPage";
import AdminOrderPage from "./adminOrderPage";
import { useEffect, useState } from "react";
import Loader from "../../component/loader";
import toast from "react-hot-toast";
import axios from "axios";
import AdminUserPage from "./adminUserPage";
import UserData from "../../component/userData.jsx";



export default function AdminPage(){
 
    const[isUserValidated,setUserValidated] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{

        const token = localStorage.getItem("token");

        if(token == null){
            toast.error("You are not logged in, please Login as Admin")
            navigate('/login')
            
        }else{
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current",{
                headers :{
                    Authorization : "Bearer " + token,
                }
            }).then(
               (res)=>{
                 if(res.data.user.userType == "admin"){
                    setUserValidated(true)
                 }else{
                    toast.error("please login as an Admin");
                    navigate("/login")
                 }
               }
            ).catch(
              (error)=>{
                console.log(error.message)
                toast.error("Something went wrong please Login")
              }
            )
        }

    },[])

    return(
        <>
        {
            isUserValidated ?

            <div className="w-full h-screen flex p-2 bg-gray-200">
            <div className="w-[300px] h-full">
                <Link to ="/admin" className="block w-full h-[50px] bg-blue-500 text-white rounded-xl text-center p-2 m-2 ">Dashboard</Link>
                <Link to = "/admin/users" className="block w-full h-[50px] bg-blue-500 text-white rounded-xl text-center p-2 m-2 flex  item-center justify-center"><FaUsers className="mr-2"/>Users</Link>
                <Link to = "/admin/products" className="block w-full h-[50px] bg-blue-500 text-white rounded-xl text-center p-2 m-2 flex justify-center items-center"><MdOutlineProductionQuantityLimits className="mr-2" />Products</Link>
                <Link to = "/admin/orders" className="block w-full h-[50px] bg-blue-500 text-white rounded-xl text-center p-2 m-2 flex justify-center items-center"><FaBorderAll className="mr-2"/>Orders</Link>
                <Link to = "/admin/addProduct" className="block w-full h-[50px] bg-blue-500 text-white rounded-xl text-center p-2 m-2 flex justify-center items-center" ><FaBorderAll className="mr-2"/>Add product</Link>
                <Link to = "/login" className="block w-full h-[50px] bg-blue-500 text-white rounded-xl text-center p-2 m-2 flex justify-center items-center" ><SlLogout className="mr-2"/>Sign out</Link>

            </div>
            <div className="w-[calc(100vw-300px)] h-full bg-white rounded-lg">
                <Routes path="/*">
                    <Route path='/users' element={<AdminUserPage/>}></Route>
                    <Route path='/products' element={<AdminProduct/>}></Route>
                    <Route path='/orders' element={<AdminOrderPage/>}></Route>
                    <Route path="/addProduct" element={<AddProduct/>}></Route>
                    <Route path="/editProduct" element={<EditForm/>}></Route>
                    <Route path="/login" element={<UserData/>}></Route>
                </Routes>
            </div>
        </div> :
        <Loader></Loader>
        } 
        
        </> 
    )
}