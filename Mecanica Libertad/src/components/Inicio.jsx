import React from "react";
import Slider from "react-slick";
import { assets } from "../assets/assets";

const imageData = [
  { id: 1, img: assets.Mecanica1 },
  { id: 2, img: assets.Mecanica2 },
  { id: 3, img: assets.Mecanica3 },
  
];

function Inicio() {
  const settings = {
    customPaging: function (i) {
      return (
        <img
          src={imageData[i].img}
          alt={`Thumbnail ${i + 1}`}
          className="w-24 h-24 object-cover rounded-md border border-gray-300 hover:opacity-80 transition-opacity hover:scale-105 duration-300"
        />
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
  };

  return (
    <div id="inicio" className="w-full px-6 py-8 pb-32 md:pb-22">
      <Slider {...settings}>
        {imageData.map((data) => (
          <div key={data.id}>
            <img
              src={data.img}
              alt={`Slide ${data.id}`}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Inicio;
