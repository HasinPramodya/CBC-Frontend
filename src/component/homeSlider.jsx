import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
export default function HomeSlider() {

       const images = [
           "/home-slider-1.jpg",
           "/home-slider-2.jpg",
           "/home-slider-3.jpg",
        ];

        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 2000,
            cssEase: "linear"
        };

  return (
    <>
        <div className="slider-container">
            <Slider {...settings}>
                {
                    images.map((image, index) => (
                        <div key={index} className="slider-item">
                            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                        </div>
                    ))
                }
            </Slider>
        </div>
    </>
  )
}