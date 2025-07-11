
import { TbClock24 } from "react-icons/tb";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiDiscount1 } from "react-icons/ci";
import { RiCustomerServiceFill } from "react-icons/ri";
import HomeSlider from "../../component/homeSlider.jsx";
import { FaArrowRight } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
export default function LandingPage() {
    const navigate = useNavigate()
  return (
    <>
      <div className="w-full h-full m-1">
        <div className="w-full lg:h-[450px] h-[100px] border border-white rounded-2xl">
            <HomeSlider/>
        </div>
        <div className="w-full flex flex-col lg:flex-row">
            <div className="w-full lg:h-[200px] h-[100px]   justify-center items-center p-[10px]">
                <TbClock24 className="lg:text-[60px] text-[30px]"/>
                <h1 className="lg:text-2xl text-xl">24x7 Service</h1>
                <h2 className="lg:text-xl text-md">Dedicated Team to Attend Customer Inquiries</h2>
            </div>
            <div className="w-full lg:h-[200px] h-[100px]   justify-center items-center p-[10px]">
                <CiDeliveryTruck className="lg:text-[60px] text-[30px]"/>
                <h1 className="lg:text-2xl text-xl">Island Wide Delivery</h1>
                <h2 className="lg:text-xl text-md">Maximum 3-4 Days Delivery</h2>
            </div>
            <div className="w-full lg:h-[200px] h-[100px]  justify-center items-center p-[10px]">
                <CiDiscount1 className="lg:text-[60px] text-[30px]"/>
                <h1 className="lg:text-2xl text-xl">Discounts & Offers</h1>
                <h2 className="lg:text-xl text-md">Exclusive Discounts for Customers</h2>
            </div>
            <div className="w-full lg:h-[200px] h-[100px]   justify-center items-center p-[10px]">
                <RiCustomerServiceFill className="lg:text-[60px] text-[30px]"/>
                <h1 className="lg:text-2xl text-xl">Expert Beauty Advice for Free</h1>
                <h2 className="lg:text-xl text-md">Free Consultations Over Phone Calls or Online</h2>
            </div>

        </div>

          <div className="w-full flex justify-center items-center">
              <h1 className="ext-lg font-bold">Our Valuble Services For You</h1>
          </div>
          <div className="w-full mt-[10px]">
              <p className="text-lg text-gray-500 m-[8px]">
                  Celebrate special occasions with amazing gifts, gift cards and deals for your loved ones. To explore an in-store experience, head over to our outlets. We are located at Nugegoda, One Galle Face, Pepiliyana & Kiribathgoda. Multiple payment methods are available for a convenient checkout: Credit card/Debit card, Cash on delivery. Enjoy Island Wide Delivery. Dive into an epic experience now with a few clicks.
              </p>
          </div>
          <div className="w-full flex justify-center items-center mt-[20px]">
              <button
                  className="flex items-center justify-between gap-2 bg-pink-800 text-white w-[200px] h-[50px] px-4 rounded-lg hover:bg-white hover:text-pink-800 border border-pink-800 cursor-pointer m-2"
                  onClick={() => {
                      navigate("/products");
                  }}
              >
                  View Products
                  <FaArrowRight />
              </button>

          </div>

      </div>
    </>
  );
}