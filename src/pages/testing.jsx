import { useState } from "react";
import toast from "react-hot-toast";
import MediaUpload from "../utills/mediaUplaod";


export default function Test() {
const [file,setFile] = useState(null)



  function hadleUpload() {
  
      MediaUpload(file).then(
        (url)=>{
         console.log(url)
         toast.success("image uploaded Successfully");
        }
      ).catch(
        (error)=>{
          console.log(error)
        }
      )
  }
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <input
          type="file"
          onChange={(e) => {
           setFile(e.target.files[0]); 
          }}
        ></input>
        <button
          onClick={hadleUpload}
          className="bg-gray-700 text-white p-2 rounded-lg"
        >
          Upload
        </button>
      </div>
    </>
  );
}
