import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import MediaUpload from "../../utills/mediaUplaod";

export default function AddProduct() {
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState([]);
  const [price, setPrice] = useState(0);
  const [labeledPrice, setLabeledPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit() {
    const promisesArray = [];
    for (let i = 0; i < images.length; i++) {
      const promises = MediaUpload(images[i]);
      promisesArray[i] = promises;
    }

    try {
      const result = await Promise.all(promisesArray);

      const altNamesArray = alternativeNames.split(",");

      const product = {
        productId: productID,
        name: productName,
        altNames: altNamesArray,
        price: price,
        labelPrice: labeledPrice,
        description: description,
        stock: stock,
        images: result
      };

      const Token = localStorage.getItem("token");
      console.log(Token);

      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/product/", product, {
          headers: {
            Authorization: "Bearer " + Token,
          },
        })
        .then((res) => {
          console.log(res.data.message);
          toast.success("Product Added Successfully");
          navigate("admin/products");
        })
        .catch((err) => {
          console.log(err.response.data.message);
          toast.error("Failed to add product");
        });
    } catch (error) {
      console.log(error);
      toast.error("Product add failed");
    }
  }

  return (
    <>
      <div className="w-full h-full rounded-lg  flex justify-center items-center">
        <div className="w-[600px] h-[600px] rounded-lg bg-white shadow-lg flex flex-col  items-center p-5">
          <h1 className="text-2xl font-bold">Add Product</h1>
          <input
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[4px]"
            type="String"
            placeholder="Product ID"
            onChange={(e) => {
              setProductID(e.target.value);
            }}
          ></input>
          <input
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[4px]"
            type="String"
            placeholder="Product Name"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          ></input>
          <input
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[4px]"
            type="String[]"
            placeholder="Alternative Names"
            onChange={(e) => {
              setAlternativeNames(e.target.value);
            }}
          ></input>
          <input
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[4px]"
            type="Number"
            placeholder="Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          ></input>
          <input
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[4px]"
            type="Number"
            placeholder="Labeled Price"
            onChange={(e) => {
              setLabeledPrice(e.target.value);
            }}
          ></input>
          <textarea
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[4px]"
            type="String"
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
