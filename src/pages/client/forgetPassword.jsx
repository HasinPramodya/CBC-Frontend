import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate();

    function sendEmail(){
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/send", {
            email: email
        }).then((res) => {
            console.log(res.data);
            setEmailSent(true);
            toast.success("OTP sent to your email");
        }).catch((error) => {
            console.error(error.response.data);
        });
    }
    function resetPassword(){
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        axios.post(import.meta.env.VITE_BACKEND_URL  + "/api/user/changepw", {
            email: email,
            otp: otp,
            newPassword: password
        }).then((res) => {
            console.log(res.data);
            toast.success("Password reset successfully");
            navigate("/login");

        }).catch((error) => {
            console.error(error.response.data);
            toast.error("Something went wrong, please try again");
            window.location.reload();
        })
    }
    return(
        <>
            <div className="w-full h-screen bg-gray-200 flex p-2">
            {
              emailSent ?
                  <div className="w-full h-full flex items-center justify-center">
                      <div className="bg-white p-4 rounded shadow-md w-[400px]">
                          <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
                          <div className="mb-4">
                              <label
                                  htmlFor="otp"
                                  className="block text-sm font-medium text-gray-700"
                              >
                                  OTP
                              </label>
                              <input
                                  type="text"
                                  id="otp"
                                  name="otp"
                                  required
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                  onChange={(e) => {
                                      setOtp(e.target.value);
                                  }}
                                  value={otp}
                              />
                          </div>
                          <div className="mb-4">
                              <label
                                  htmlFor="password"
                                  className="block text-sm font-medium text-gray-700"
                              >
                                  New Password
                              </label>
                              <input
                                  type="password"
                                  id="password"
                                  name="password"
                                  required
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                  onChange={(e) => {
                                      setPassword(e.target.value);
                                  }}
                                  value={password}
                              />
                          </div>
                          <div className="mb-4">
                              <label
                                  htmlFor="confirmPassword"
                                  className="block text-sm font-medium text-gray-700"
                              >
                                  Confirm Password
                              </label>
                              <input
                                  type="password"
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  required
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                  onChange={(e) => {
                                      setConfirmPassword(e.target.value);
                                  }}
                                  value={confirmPassword}
                              />
                          </div>
                          <button

                              type="submit"
                              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                              onClick={resetPassword}
                          >
                              Reset Password
                          </button>
                      </div>
                  </div>
            :<div className="w-full h-full flex items-center justify-center">
                <div className="bg-white p-4 rounded shadow-md w-[400px]">
                    <h1 className="text-2xl font-bold mb-4">Forget Password</h1>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        onClick={sendEmail}
                    >
                        Send OTP
                    </button>
                </div>
            </div>
        }
            </div>
        </>
    )
}