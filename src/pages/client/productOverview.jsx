import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../component/loader.jsx";
import ImageSlider from "../../component/imageslider.jsx";
import { addToCart } from "../../utills/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {
  const params = useParams();
  if (params.id == null) {
    window.location.href = "/products";
  }
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("Loading"); //loading,loaded,error



  useEffect(() => {
    if (status == "Loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + params.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setProduct(res.data.product);
          console.log(res.data.product);
          setStatus("loaded");
        })
        .catch((error) => {
          console.log(error);
          setStatus(error);
        });
    }
  }, [params.id, navigate, status]);
  return (
    <>
      <div className="w-full h-full">
        {status == "Loading" && <Loader />}

        {status == "loaded" && (
          <div className="w-full h-screen flex flex-col lg:flex-row">
            
              <h1 className="text-3xl lg:hidden text-center font-bold mb-[40px]">
                {product.name}
                {" | "}
                <span className="text-3xl font-semibold text-center text-gray-500">
                  {product.altNames.join(" | ")}
                </span>
              </h1>
              <div className="w-full lg:h-full lg:w-[50%] ">
                {console.log(product)}
                <ImageSlider images={product.images} />
              </div>
            

            <div className="w-full lg:w-[50%] pt-[100px]  h-full  p-[40px]">
              <h1 className="hidden lg:block text-3xl  font-bold text-center mb-[40px]">
                {product.name}
                {" | "}
                <span className="text-3xl font-semibold text-center text-gray-500">
                  {product.altNames.join(" | ")}
                </span>
              </h1>
              <h2 className="text-2xl mr-[20px]"></h2>
              <div className="w-full flex justify-center mb-[40px]">
                {product.labelPrice > product.price ? (
                  <>
                    <h2 className="text-2xl text-gray-500 mr-[20px]">
                      {product.price.toFixed(2)}
                    </h2>
                    <h2 className="text-2xl line-through x">
                      LKR: {product.labelPrice.toFixed(2)}
                    </h2>
                  </>
                ) : (
                  <h2 className="text-2xl mr-[20px]">{product.price}</h2>
                )}
              </div>
              <h2 className="text-xl font-semibold text-center text-gray-500">
                LKR: {product.price}
              </h2>
              <p className="text-xl text-center text-gray-500 mb-[40px]">
                {product.description}
              </p>
              <div className="w-full  flex justify-center  mb-[40px]">
                <button
                  className="bg-pink-800 text-white w-[200px] h-[50px] rounded-lg hover:bg-white hover:text-pink-800 border border-pink-800 cursor-pointer m-2"
                  onClick={() => {
                    addToCart(product, 1);
                    toast.success("Product Successfully add to cart");
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-pink-800 text-white w-[200px] h-[50px] rounded-lg hover:bg-white hover:text-pink-800 border border-pink-800 cursor-pinter m-2"
                  onClick={() => {
                    navigate("/checkout", {
                      state: {
                        items: [
                          {
                            productId: product.productId,
                            name: product.name,
                            altNames: product.altNames,
                            price: product.price,
                            image: product.images[0],
                            labelPrice: product.labelPrice,
                            quantity: 1,
                          },
                        ],
                      },
                    });
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
        {status == "error" && Error}
      </div>
    </>
  );
}
