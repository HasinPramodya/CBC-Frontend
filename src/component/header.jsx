import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import UserData from "./userData";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-pull h-[75px]  flex justify-start bg-gray-200 relative items-center">
        <GiHamburgerMenu className="lg:hidden text-3xl text-accent mx-4" onClick={()=>{
          setIsOpen(!isOpen);
        }}/>
        <div className="hidden lg:flex w-[400px] h-full justify-evenly items-center text-red-900 text-xl">
          <Link to="/">Home</Link>
          <Link to="/products">Product</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/cart" className="absolute right-[30px] text-3xl">
            <ShoppingCart />
          </Link>
          <div className="absolute right-[70px] h-full flex">
            <UserData />
          </div>
        </div>
        {isOpen && (
          <div className="fixed lg:hidden z-[9999] top-0 left-0 bg-[#00000060] w-full h-screen flex">
            <div className="w-[300px] h-full bg-white  flex flex-col justify-start items-start p-4">
              <GiHamburgerMenu className="text-3xl text-accent" onClick={()=>{
                setIsOpen(!isOpen);
              }}/>
              <Link to="/">Home</Link>
              <Link to="/products">Product</Link>
              <Link to="/contact-us">Contact Us</Link>
              <Link to="/about-us">About Us</Link>
              <Link to="/cart" className="text-3xl mb-2">
                <ShoppingCart />
              </Link>
              <div>
                <UserData />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
