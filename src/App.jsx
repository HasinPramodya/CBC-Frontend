import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AdminPage from './pages/admin/adminPage'
import LoginPage from './pages/loginPage'
import Test from './pages/testing'
import RegisterPage from './pages/client/register'
import HomePage from './pages/homepage'
import { Toaster } from 'react-hot-toast'
import CartPage from './pages/client/cart'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from "./pages/client/forgetPassword.jsx";
import OrdersPage from "./pages/client/ordersPage.jsx";

function App() {
  
  return (
    <>
     <GoogleOAuthProvider clientId="534412220843-4h1al7n12ubbe89t439g7dljp6h8hjq7.apps.googleusercontent.com">
     <BrowserRouter>
     <Toaster position='top-center'></Toaster>
       <Routes path="/*">
         <Route path='/admin/*' element={<AdminPage/>}></Route>
         <Route path='/login' element={<LoginPage/>}></Route>
         <Route path='/test' element={<Test/>}></Route>
         <Route path='/register' element={<RegisterPage/>}></Route>
         <Route path='/*' element={<HomePage/>}></Route>
         <Route path='/cart' element={<CartPage/>}></Route>
           <Route path='/forget'element={<ForgetPasswordPage/>}></Route>
           <Route path='/orders'element={<OrdersPage/>}></Route>
       </Routes>
     </BrowserRouter>
     </GoogleOAuthProvider>
    </>
  )
}

export default App
