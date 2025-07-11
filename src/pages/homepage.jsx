import { Route, Routes } from "react-router-dom";
import Header from "../component/header";
import ProductPage from "./client/poductPage";
import ProductOverview from "./client/productOverview";
import CheckoutPage from "./client/checkout";
import ContactUsPage from "./client/contactUs.jsx";
import AboutUsPage from "./client/aboutUsPage.jsx";
import LandingPage from "./client/landingPage.jsx";


export default function HomePage(){
    return(
        <>
          <div className="w-full h-screen max-h-screen">
             <Header/>
             <div className="w-full h-[calc(100vh-75px)] min-h-[calc(100vh-75px)]">
              <Routes>
                 <Route path="/" element={<LandingPage/>}></Route>
                 <Route path="/products" element={<ProductPage/>}></Route>
                 <Route path="/overview/:id" element={<ProductOverview/>}></Route>
                 <Route path="/checkout" element={<CheckoutPage/>}></Route>
                  <Route path="/contact-us" element={<ContactUsPage/>}></Route>
                  <Route path="/about-us" element={<AboutUsPage/>}></Route>
                 <Route path="/*" element={<h1>404 Not Found</h1>}></Route>
              </Routes>
             </div>
          </div>
        </>
    )
}