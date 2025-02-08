"use client";

import { useState } from "react";
import Image from "next/image";

const Welcome: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "Stand-up Showcases",
      description:
        "Enjoy the best stand-up comedians in town, bringing laughter and joy to your night.",
      image:
        "https://plus.unsplash.com/premium_photo-1720188548716-9de4d2911fff?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Pop Star Dance Parties",
      description:
        "Get ready to dance and sing along with your favorite pop stars in an electrifying atmosphere.",
      image:
        "https://images.unsplash.com/photo-1738193026612-4a953a4f4e96?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="bg-blue-500 text-white flex flex-col items-center justify-center">
      <div className="text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-2">HAPPENINGS HUB</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          POPULAR EVENT IN INDONESIA
        </h2>
        <button className="bg-white text-blue-500 font-semibold px-6 py-2 rounded-full mb-6 hover:bg-blue-100 transition duration-300">
          See the Event!
        </button>
      </div>
      <div className="relative w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 m-6 flex flex-col items-center">
          <div className="relative w-full h-96">
            <Image
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              fill
              className="rounded-lg mb-4 object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {slides[currentIndex].title}
          </h3>
          <p className="text-gray-700 text-center">
            {slides[currentIndex].description}
          </p>
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-blue-500 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-blue-500 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Welcome;
