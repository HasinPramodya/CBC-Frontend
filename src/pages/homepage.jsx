import { Route, Routes } from "react-router-dom";
import Header from "../component/header.jsx";
import ProductPage from "./client/poductPage.jsx";
import ProductOverview from "./client/productOverview.jsx";
import CheckoutPage from "./client/checkout.jsx";
import ContactUs from "./contactUs.jsx";
import AboutUsPage from "./client/aboutUsPage.jsx";
import LandingPage from "./client/landingPage.jsx";
import NotFound from "../component/notFound.jsx";
import Footer from "../component/footer.jsx";


export default function HomePage(){
    return(
        <>
          <div className="min-h-screen flex flex-col">
             <Header/>
             <div className="flex-1">
              <Routes>
                 <Route path="/" element={<LandingPage/>}></Route>
                 <Route path="/products" element={<ProductPage/>}></Route>
                 <Route path="/overview/:id" element={<ProductOverview/>}></Route>
                 <Route path="/checkout" element={<CheckoutPage/>}></Route>
                  <Route path="/contact-us" element={<ContactUsPage/>}></Route>
                  <Route path="/about-us" element={<AboutUsPage/>}></Route>
                 <Route path="/*" element={<NotFound/>}></Route>
              </Routes>
             </div>
              <Footer/>
          </div>
        </>
    )
}