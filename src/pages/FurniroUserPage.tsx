import React, { useState, useEffect } from 'react';
import { Avatar, Button, Rate } from 'antd';
import { UserOutlined, BankOutlined, EnvironmentOutlined, RightOutlined, ShoppingOutlined, CarOutlined, CheckOutlined } from '@ant-design/icons';

interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
}

interface FurniroUserPageProps {
  setActiveItem: (item: string) => void;
  handleOrderClick: (tab: string) => void;
  setIsAccountExpanded: (isExpanded: boolean) => void;
}

const FurniroUserPage: React.FC<FurniroUserPageProps> = ({ setActiveItem, handleOrderClick, setIsAccountExpanded }) => {
  const [currentUser, setCurrentUser] = useState<{ name: string; avatar: string | null } | null>(null);
  const [likedProducts] = useState<Product[]>([]);
  const [reviewedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(user);
  }, []);

  const handleProfileClick = () => {
    setActiveItem('profile_info');
    setIsAccountExpanded(true);
  };

  const handleBankClick = () => {
    setActiveItem('profile_bank');
    setIsAccountExpanded(true);
  };

  const handleAddressClick = () => {
    setActiveItem('profile_address');
    setIsAccountExpanded(true);
  };

  return (
    <div className="flex flex-wrap -mx-4">
      <div className="w-full md:w-1/2 px-4">
        <div className="mx-4 my-6 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <div className="flex items-center">
              <Avatar size={64} src={currentUser?.avatar} icon={<UserOutlined />} />
              <div className="ml-4">
                <p className="text-lg font-semibold">Xin chào</p>
                <p>{currentUser?.name}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6">
            <div className="flex flex-col items-center">
              <Button 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={handleProfileClick}
              >
                <UserOutlined className="text-lg text-gray-600" />
              </Button>
              <span className="mt-2 text-xs">Hồ sơ</span>
            </div>
            <div className="flex flex-col items-center">
              <Button 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={handleBankClick}
              >
                <BankOutlined className="text-lg text-gray-600" />
              </Button>
              <span className="mt-2 text-xs">Ngân hàng & Thẻ</span>
            </div>
            <div className="flex flex-col items-center">
              <Button 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={handleAddressClick}
              >
                <EnvironmentOutlined className="text-lg text-gray-600" />
              </Button>
              <span className="mt-2 text-xs">Địa chỉ</span>
            </div>
          </div>
        </div>
        
        <div className="mx-4 my-6 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Đơn hàng</h2>
            <Button type="link" className="flex items-center" onClick={() => handleOrderClick('all')}>
              Khám phá thêm
              <RightOutlined className="ml-1" />
            </Button>
          </div>
          <div className="flex justify-center gap-6">
            <div className="flex flex-col items-center">
              <Button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200" onClick={() => handleOrderClick('new')}>
                <ShoppingOutlined className="text-lg text-gray-600" />
              </Button>
              <span className="mt-2 text-xs">Đơn hàng mới</span>
            </div>
            <div className="flex flex-col items-center">
              <Button 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={() => handleOrderClick('shipping')}
              >
                <CarOutlined className="text-lg text-gray-600" />
              </Button>
              <span className="mt-2 text-xs">Đang vận chuyển</span>
            </div>
            <div className="flex flex-col items-center">
              <Button 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={() => handleOrderClick('delivered')}
              >
                <CheckOutlined className="text-lg text-gray-600" />
              </Button>
              <span className="mt-2 text-xs">Đã giao</span>
            </div>
          </div>
        </div>
        
        <div className="mx-4 my-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Đánh giá sản phẩm</h2>
          {reviewedProducts.length === 0 ? (
            <div className="text-center flex items-center justify-center h-32">
              Đánh giá sản phẩm trống
            </div>
          ) : (
            reviewedProducts.map(product => (
              <div key={product.id} className="flex items-center mb-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <Rate disabled defaultValue={product.rating} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="w-full md:w-1/2 px-4">
        <div className="mx-4 my-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Yêu thích</h2>
          {likedProducts.length === 0 ? (
            <div className="text-center flex items-center justify-center h-32">
              Sản phẩm yêu thích trống
            </div>
          ) : (
            likedProducts.map(product => (
              <div key={product.id} className="flex items-center mb-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                <p className="font-semibold">{product.name}</p>
              </div>
            ))
          )}
        </div>
        
        {/* Thêm phần Sản phẩm đã xem */}
        <div className="mx-4 my-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sản phẩm đã xem</h2>
            <div className="text-center flex items-center justify-center h-32">
              Sản phẩm đã xem trống
            </div>
        </div>
      </div>
    </div>
  );
};

export default FurniroUserPage;