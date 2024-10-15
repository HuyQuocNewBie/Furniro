import React, { useState, useEffect } from 'react';
import { UpOutlined } from '@ant-design/icons';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 cursor-pointer bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white shadow-lg transition-opacity duration-300 hover:opacity-80"
          style={{ zIndex: 1000 }}
        >
          <UpOutlined style={{ fontSize: '20px' }} />
        </div>
      )}
    </>
  );
};

export default ScrollToTop;