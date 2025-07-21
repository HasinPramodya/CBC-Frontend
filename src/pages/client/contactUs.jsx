import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../component/loader.jsx";

export default function ContactUsPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [comment, setComment] = useState("")
    const [loaded, setLoaded] = useState(true)

    useEffect(()=>{},[loaded]);

    async function handleSubmit() {

        const contact = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            comment: comment
        }

        try{
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/contact", contact

            );
            console.log(res.data);
            toast.success("Successfully sent your message");
        }catch (error) {
            console.log(error.response.data);
            toast.error("Failed to send your message");
        }

        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setComment("");

    }

    return (
        <>{ loaded ?
            <div className="w-full h-full rounded-lg flex justify-center items-center">
                <div className="w-full h-full lg:w-[600px] lg:h-[600px] rounded-lg bg-white shadow-lg flex flex-col p-[40px] items-center">
                    <h1 className="text-2xl font-bold m-[8px] lg:m-[12px]">Contact Us</h1>
                    <input
                        className="w-full h-12 lg:w-[400px] border border-gray-500 rounded-xl text-center m-[6px] lg:m-[10px]"
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="w-full h-12 lg:w-[400px]  border border-gray-500 rounded-xl text-center m-[6px] lg:m-[10px]"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="w-full h-12 lg:w-[400px]  border border-gray-500 rounded-xl text-center m-[6px] lg:m-[10px]"
                        type="text"
                        placeholder="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        className="w-full h-12 lg:w-[400px]  border border-gray-500 rounded-xl text-center m-[6px] lg:m-[10px]"
                        type="text"
                        placeholder="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <textarea
                        className="w-full h-20 lg:w-[400px]  border border-gray-500 rounded-xl text-center m-[8px] lg:m-[12px]"
                        type="text"
                        placeholder="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="w-full h-12 lg:w-[400px] border border-gray-500 bg-red-900 rounded-xl text-center text-white cursor-pointer mt-[6px]"
                        onClick={()=>{

                            handleSubmit();
                            setLoaded(false);
                            setLoaded(true);

                        }}
                    >
                        Send
                    </button>


                </div>
            </div> :
            <Loader/>
        }

        </>
    )
}