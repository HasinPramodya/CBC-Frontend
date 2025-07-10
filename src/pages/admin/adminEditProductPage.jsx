import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import MediaUpload from "../../utills/mediaUplaod";

export default function EditForm() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.state == null) {
    toast.error("please select a product");
    navigate("/admin/products");
  }

  const [productID, setProductID] = useState(location.state.productId);
  const [productName, setProductName] = useState(location.state.name);
  const [alternativeNames, setAlternativeNames] = useState(
    location.state.altNames.join(",")
  );
  const [price, setPrice] = useState(location.state.price);
  const [labeledPrice, setLabeledPrice] = useState(location.state.labelPrice);
  const [description, setDescription] = useState(location.state.description);
  const [stock, setStock] = useState(location.state.stock);
  const [images, setImages] = useState([]);
  

 


  async function handleSubmit(){

     const promisesArray = [];
        for (let i = 0; i < images.length; i++) {
          const promises = MediaUpload(images[i]);
          promisesArray[i] = promises;
        }
   try{
    let result = await Promise.all(promisesArray);
    if(images.length==0){
        result = location.state.images;
    }
    const altNamesArray = alternativeNames.split(",");

    const product = {
    productId: productID,
    name: productName,
    altNames: altNamesArray,
    price: price,
    labelPrice: labeledPrice,
    description: description,
    stock: stock,
    images: result,
  };

   const Token = localStorage.getItem("token");

    axios
    .put(
      import.meta.env.VITE_BACKEND_URL + "/api/product/"+productID,
      product,
      {
        headers: {
          Authorization: "Bearer " + Token,
        },
      }
    )
    .then(() => {
      toast.success("Product updated successfully");
      navigate("/admin/products")
    })
    .catch((error) => {
      console.log(error);
    });

   }catch{
    console.log("error");
   }
    
  }

 
  
  return (
    <>
      <div className="w-full h-full rounded-lg  flex justify-center items-center">
        <div className="w-[600px] h-[600px] rounded-lg bg-white shadow-lg flex flex-col  items-center p-5">
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <input
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[4px]"
            type="String"
            value={productID}
            placeholder="Product ID"
            onChange={(e) => {
              setProductID(e.target.value);
            }}
          ></input>
          <input
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[4px]"
            type="String"
            value={productName}
            placeholder="Product Name"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          ></input>
          <input
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[4px]"
            type="String[]"
            value={alternativeNames}
            placeholder="Alternative Names"
            onChange={(e) => {
              setAlternativeNames(e.target.value);
            }}
          ></input>
          <input
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[4px]"
            type="Number"
            value={price}
            placeholder="Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          ></input>
          <input
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[4px]"
            type="Number"
            value={labeledPrice}
            placeholder="Labeled Price"
            onChange={(e) => {
              setLabeledPrice(e.target.value);
            }}
          ></input>
          <textarea
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[4px]"
            type="String"
            value={description}
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          <input
            type="file"
            onChange={(e) => {
              setImages(e.target.files);
            }}
          ></input>
          <input
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[4px]"
            type="Number"
            value={stock}
            placeholder="Stock"
            onChange={(e) => {
              setStock(e.target.value);
            }}
          ></input>
          <div className="w-[400px] h-[100px] m-5 flex justify-between items-center">
            <button
              to={"/admin/products"}
              className="bg-red-500 text-white p-[10px] w-[150px] text-center rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white p-[10px] w-[150px] text-center rounded-lg hover:bg-gtreen-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
