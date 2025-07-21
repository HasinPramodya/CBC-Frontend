import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../component/loader";
import ProductCard from "../../component/productCard";

export default function ProductPage() {
    const [productList, setProductList] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!productsLoaded) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/product/products"

                )
                .then((res) => {
                    setProductList(res.data.products);
                    setProductsLoaded(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [productsLoaded]);

    function searchProducts() {
        axios
            .get(
                import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + search,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((res) => {
                setProductList(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="w-full px-4 py-6">
            {/* Search Bar */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    className="w-full sm:w-[300px] h-[40px] border-2 border-gray-300 rounded-md px-3"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                        searchProducts();
                    }}
                >
                    Search
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                        setProductsLoaded(false);
                    }}
                >
                    Reset
                </button>
            </div>

            {/* Product Grid */}
            <div className="w-full min-h-[300px]">
                {productsLoaded ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productList.map((product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))}
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
}
