import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../../component/loader";
import { useNavigate } from "react-router-dom";

export default function AdminProduct() {
  const [products, setProduct] = useState([]);
  const [loaded,setLoaded] = useState(false);
  const navigate=useNavigate();


  useEffect(() => {
    if(!loaded){
     axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        
        setProduct(res.data.products);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    }
    
  }, [loaded]);

  async function deleteProduct(id) {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/api/product/"+id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoaded(false)
      toast.success("Product deleted successfully")
    } catch (error) {
      console.log(error);
      toast.error("Product can not deleted")
    }
  }

  

  

  return (
    <>
      <div className="w-full h-screen rounded-xl flex justify-center items-center">
       { loaded && <table>
          <thead>
            <tr>
              <th className="p-2 m-6">Product ID</th>
              <th className="p-2 m-6">Name</th>
              <th className="p-2 m-6">Price</th>
              <th className="p-2 m-6">Labeled Price</th>
              <th className="p-2 m-6">Stock</th>
              <th className="p-2 m-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.productId}
                className="border-b-2 border-gray-300 hover:bg-gray-100"
              >
                <td className="p-2 m-6">{product.productId}</td>
                <td className="p-2 m-6">{product.name}</td>
                <td className="p-2 m-6">{product.price}</td>
                <td className="p-2 m-6">{product.labelPrice}</td>
                <td className="p-2 m-6">{product.stock}</td>
                <td className="p-2 m-6">
                  <div className="w-full h-full flex justify-between">
                    <Trash2 className="text-[20px] m-[5px] hover:text-red-600" onClick={()=>{
                      deleteProduct(product.productId)
                    }}></Trash2>
                    <Pencil className="text-[20px] m-[5px] hover:text-green-600"onClick={()=>{
                       navigate("/admin/editProduct",{
                        state: product,
                        
                       });
                    }}></Pencil>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table> }
        {
          ! loaded && <Loader/>
        }
      </div>
    </>
  );
}
