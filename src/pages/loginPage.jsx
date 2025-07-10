import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { RiGoogleFill } from "react-icons/ri";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (res) => {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
          accessToken: res.access_token,
        })
        .then((response) => {
          console.log("Login Successful", response.data);
          setLoading(false);
          toast.success(`${response.data.message}`);
          localStorage.setItem("token", response.data.your_token); // saving in th browser

          const user = response.data.user;

          if (user.userType === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error.message);
          toast.error("Login Failed");
        });
    },
  });

  function handleLogin() {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("Login Successful", res.data.message);
        setLoading(false);
        toast.success(`${res.data.message}`);
        localStorage.setItem("token", res.data.your_token); // saving in th browser

        const user = res.data.user;

        if (user.userType === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Login Failed", err.response.data.message);
        setLoading(false);
        toast.error(err.response.data.message || "Login failed");
      });
  }

  return (
    <>
      <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
        <div className="w-[50%] h-full border-[1px]"></div>
        <div className="w-[50%] h-full border-[1px] flex justify-center items-center">
          <div className="w-[550px] h-[600px] backdrop-blur-xl shadow-xl rounded-b-xl flex flex-col justify-center items-center">
            <input
              className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[4px]"
              type="email"
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <input
              className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[6px]"
              type="password"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <button
              className="w-[400px] h-[50px] border border-white bg-green-500 rounded-xl text-center text-white cursor-pointer"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="w-[400px] h-[50px] border border-white bg-green-500 rounded-xl text-center text-white cursor-pointer flex justify-center items-center m-[10px]"
              onClick={loginWithGoogle}
            >
              <RiGoogleFill className="mr-[10px]" />
              Login with Google
            </button>
            <p className="text-gray-500 text-center m-1">
              Don't have an acoount yet?{" "}
              <span className="text-green-500 cursor-pointer hover:text-green-700">
                <Link to={"/register"}>Register Now</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
