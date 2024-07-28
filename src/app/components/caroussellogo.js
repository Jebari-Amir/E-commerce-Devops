import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const logos = [
  "a.png",
  "aa.png",
  "aaa.png",
  "aaaa.png",
  "https://logos-marques.com/wp-content/uploads/2021/03/Apple-logo.png",
    
  "https://i.pinimg.com/564x/dc/36/c1/dc36c1d02dfe2ec192b7ec6d2289cb2d.jpg",

  
];

const LogoCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="mx-auto max-w-8xl py-4 sm:py-6 lg:py-14">
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className="flex justify-center items-center">
            <img src={logo} alt={`Logo ${index + 1}`} className="h-20" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LogoCarousel;
