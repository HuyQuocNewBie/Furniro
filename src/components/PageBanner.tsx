import React from 'react';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

interface PageBannerProps {
  title: string;
  backgroundImage: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ title, backgroundImage }) => {
  return (
    <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 mb-8">
      <img src={backgroundImage} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">{title}</h1>
        <div className="flex items-center space-x-2 text-sm sm:text-base">
          <Link to="/" className="text-white hover:text-primary transition-colors">Trang chủ</Link>
          <RightOutlined className="text-xs sm:text-sm" />
          <span className="font-semibold">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;