import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  function handleRegister() {
    axios.post(import.meta.env.VITE_BACKEND_URL +"/api/user/", {
          email : email,
          firstName : firstName,
          lastName : lastName,
          userType : role,
          password : password,
          phone : phone
    }).then((res)=>{
      console.log(res.data)
      toast.success("Successfully register");
    }

    ).catch((error)=>{
       console.log(error.response.data)
         toast.error("registration failed")
    }
         
    )

  
    
  }

  return (
    <>
      <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
        <div className="w-[50%] h-full border-[1px]"></div>
        <div className="w-[50%] h-full border-[1px] flex justify-center items-center">
          <div className="w-[550px] h-[700px] backdrop-blur-xl shadow-xl rounded-b-xl flex flex-col justify-center items-center">
            <input
              className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[4px]"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[4px]"
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[4px]"
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[4px]"
              type="text"
              placeholder="Role"
              onChange={(e) => setRole(e.target.value)}
            />
            <input
              className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[4px]"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[4px]"
              type="text"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              className="w-[400px] h-[50px] border border-white bg-green-500 rounded-xl text-center text-white cursor-pointer mt-[6px]"
              onClick={handleRegister}
            >
              Register
            </button>
            <p className="text-gray-500 text-center m-1">
              Already have an account?{" "}
              <span className="text-green-500 cursor-pointer hover:text-green-700">
                <Link to={"/login"}>Login Now</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
