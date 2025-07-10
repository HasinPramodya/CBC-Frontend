import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../../component/loader";
export default function AdminUserPage(){
    
  const [users, setUsers] = useState([]);
  const [loaded,setLoaded] = useState(false);
  


  useEffect(() => {
    if(!loaded){
     axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/user/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        
        setUsers(res.data.users);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    }
    
  }, [loaded]);

  
    return(
        <>
         <div className="w-full h-screen rounded-xl flex justify-center items-center">
       { loaded && <table>
          <thead>
            <tr>
              <th className="p-2 m-6">email</th>
              <th className="p-2 m-6">firstName</th>
              <th className="p-2 m-6">lastName</th>
              <th className="p-2 m-6">phoneNo</th>
              <th className="p-2 m-6">userType</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.productId}
                className="border-b-2 border-gray-300 hover:bg-gray-100"
              >
                <td className="p-2 m-6">{user.email}</td>
                <td className="p-2 m-6">{user.firstName}</td>
                <td className="p-2 m-6">{user.lastName}</td>
                <td className="p-2 m-6">{user.phoneNo}</td>
                <td className="p-2 m-6">{user.userType}</td>
                
              </tr>
            ))}
          </tbody>
        </table> }
        {
          ! loaded && <Loader/>
        }
      </div>
        </>
    )
}