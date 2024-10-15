import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import FurniroUserPage from './FurniroUserPage';
import AccountInfoPage from './AccountInfoPage';
import OrdersPage from './OrdersPage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('furniro');
  const [isAccountExpanded, setIsAccountExpanded] = useState(false);
  const [activeOrderTab, setActiveOrderTab] = useState('all');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (item.startsWith('profile_')) {
      setIsAccountExpanded(true);
    }
  };

  const handleOrderClick = (tab: string) => {
    setActiveItem('orders');
    setActiveOrderTab(tab);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const renderContent = () => {
    if (activeItem === 'furniro') {
      return (
        <FurniroUserPage 
          setActiveItem={handleItemClick}
          handleOrderClick={handleOrderClick}
          setIsAccountExpanded={setIsAccountExpanded}
        />
      );
    } else if (activeItem === 'profile_info') {
      return <AccountInfoPage />;
    } else if (activeItem === 'orders') {
      return <OrdersPage activeTab={activeOrderTab} setActiveTab={setActiveOrderTab} />;
    }
    return null;
  };

  const renderSidebar = () => (
    <div className="bg-white p-6 rounded-lg shadow-md mx-4 my-6">
      <h2 
        className={`text-xl font-semibold mb-4 cursor-pointer ${activeItem === 'furniro' ? 'text-[#ffcf20]' : ''}`}
        onClick={() => handleItemClick('furniro')}
      >
        Furniro của tôi
      </h2>
      <div className="mb-2">
        <button 
          onClick={() => setIsAccountExpanded(!isAccountExpanded)} 
          className="flex items-center justify-between w-full"
        >
          <span>Tài khoản của tôi</span>
          <span className="flex items-center justify-center w-6 h-6">
            {isAccountExpanded ? <MinusOutlined /> : <PlusOutlined />}
          </span>
        </button>
        <AnimatePresence>
          {isAccountExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="ml-4 mt-2">
                <li className="mb-2">
                  <button 
                    onClick={() => handleItemClick('profile_info')}
                    className={`w-full text-left ${activeItem === 'profile_info' ? 'text-[#ffcf20]' : ''}`}
                  >
                    Thông tin tài khoản
                  </button>
                </li>
                <li className="mb-2">
                  <button 
                    onClick={() => handleItemClick('profile_address')}
                    className={`w-full text-left ${activeItem === 'profile_address' ? 'text-[#ffcf20]' : ''}`}
                  >
                    Địa chỉ
                  </button>
                </li>
                <li className="mb-2">
                  <button 
                    onClick={() => handleItemClick('profile_bank')}
                    className={`w-full text-left ${activeItem === 'profile_bank' ? 'text-[#ffcf20]' : ''}`}
                  >
                    Ngân hàng & Thẻ
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ul>
        <li className="mb-2">
          <button 
            onClick={() => handleOrderClick('all')}
            className={`w-full text-left ${activeItem === 'orders' ? 'text-[#ffcf20]' : ''}`}
          >
            Đơn hàng
          </button>
        </li>
        <li className="mb-2">
          <button 
            onClick={() => handleItemClick('pending-reviews')}
            className={`w-full text-left ${activeItem === 'pending-reviews' ? 'text-[#ffcf20]' : ''}`}
          >
            Sản phẩm chờ đánh giá
          </button>
        </li>
        <li className="mb-2">
          <button 
            onClick={() => handleItemClick('my-reviews')}
            className={`w-full text-left ${activeItem === 'my-reviews' ? 'text-[#ffcf20]' : ''}`}
          >
            Đánh giá của tôi
          </button>
        </li>
        <li className="mb-2">
          <button 
            onClick={() => handleItemClick('favorites')}
            className={`w-full text-left ${activeItem === 'favorites' ? 'text-[#ffcf20]' : ''}`}
          >
            Sản phẩm yêu thích
          </button>
        </li>
        <li className="mb-2">
          <button 
            onClick={() => handleItemClick('viewed')}
            className={`w-full text-left ${activeItem === 'viewed' ? 'text-[#ffcf20]' : ''}`}
          >
            Các sản phẩm đã xem
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={handleLogout}
            className="flex items-center text-left w-full"
          >
            <LogoutOutlined className="mr-2" />
            <span>Thoát</span>
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <Header />
      <PageBanner title="Profile" backgroundImage="/images/profile-banner.jpg" />
      <div className="container mx-auto px-4 my-8">
        <div className="flex flex-wrap -mx-4">
          {!isMobile && (
            <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
              {renderSidebar()}
            </div>
          )}
          <div className={`w-full ${!isMobile ? 'md:w-2/3' : ''} px-4`}>
            {renderContent()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;