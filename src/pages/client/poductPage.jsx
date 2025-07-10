import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../component/loader";
import ProductCard from "../../component/productCard";

export default function ProductPage() {
  const [productList, setProducrtList] = useState([]);
  const [prodictsLoaded, setproductsLoaded] = useState(false);

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
          setProducrtList(res.data.products);
          setproductsLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [prodictsLoaded]);

  return (
    <>
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
