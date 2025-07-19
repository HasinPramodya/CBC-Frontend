import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";

export default function UserData(){
    const [user,setUser] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate()

    useEffect(()=>{

            if(token!=null){
                 axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current",{
                    headers :{
                        Authorization: "Bearer " + token
                    }
                }).then(
                     (res)=>{
                         setUser(res.data.user);
                     }
                 ).catch(
                     (error)=>{
                         console.log(error);
                         setUser(null);
                         navigate("/login");
                     }
                 )
            }


    },[])
    return(
        <>
            {
                (user==null) ?
                    <div className="h-full flex justify-center items-center flex-col lg:flex-row">
                        <Link to="/login" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Login</Link>
                        <Link to="/register" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ml-4">Register</Link>
                    </div> :
                    <div className="h-full flex justify-center items-center flex-col flex-row">

                        <button to="/logout" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={()=>{
                            localStorage.removeItem("token");
                            setUser(null);
                            navigate("/login");

                        }}>Logout</button>
                    </div>
            }
        </>
    )
}