import React from "react";
import { Button } from "antd";

const Hero: React.FC = () => {
  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen">
      <img
        src="/images/bannerhome.svg"
        alt="Hero background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="absolute inset-0 flex items-center justify-end pr-4 lg:pr-20">
        <div className="text-white bg-[#fff3e3] w-[55%] sm:w-[50%] md:w-[50%] lg:w-[40%] p-4 md:p-6 lg:p-8">
          <div className="max-w-[561px] mx-auto">
            <p className="font-semibold mb-1 md:mb-2 text-xs md:text-sm lg:text-base text-[#333] inline-block px-2 py-1 rounded">New Arrival</p>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-4 text-[#b88e2f] leading-tight">
              Discover Our New Collection
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-3 md:mb-6 font-medium text-[#333333]">
              Khám phá bộ sưu tập nội thất độc đáo và sang trọng, mang đến không
              gian sống tinh tế cho ngôi nhà của bạn
            </p>
            <Button
              type="primary"
              size="large"
              className="bg-[#B88E2F] text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium px-4 py-2 h-auto"
            >
              BUY NOW
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
