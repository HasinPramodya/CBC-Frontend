import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../component/loader";
import ProductCard from "../../component/productCard";

export default function ProductPage() {
  const [productList, setProductList] = useState([]);
  const [prodictsLoaded, setproductsLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!prodictsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          // console.log(res.data)
          setProductList(res.data.products);
          setproductsLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [prodictsLoaded]);

  function searchProducts(){
      axios
          .get(import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + search, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          })
          .then((res) => {
              console.log(res.data.products);
              setProductList(res.data.products);
          })
          .catch((err) => {
              console.log(err);
          });

  }

  return (
    <>
      <div className="w-full h-[50px] flex items-center justify-center">
        <input type="text" placeholder="Search" value={search} className="w-[300px] h-[30px] border-2 border-gray-300 rounded-md p-2" onChange={(e)=>{setSearch(e.target.value)}}/>
        <button className="bg-blue-500 text-white p-2 rounded-md ml-2" onClick={()=>{
          searchProducts()
        }}>Search</button>
          <button className="bg-blue-500 text-white p-2 rounded-md ml-2" onClick={()=>{
              setproductsLoaded(false)

          }
          }>Reset</button>
      </div>
      <div className="w-full h-screen">
        {prodictsLoaded ? 
          <div className="w-full h-full flex flex-wrap justify-center item-center">
            {productList.map((product) => {
              return <ProductCard key={product.productId} product={product} />
            })}
          </div>
         : 
          <Loader />
        }
      </div>
    </>
  );
}
