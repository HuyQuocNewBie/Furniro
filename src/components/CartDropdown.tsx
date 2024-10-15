import React from 'react';
import { Button, List } from 'antd';
import { useCart } from '../contexts/CartContext';
import { ShoppingCartOutlined, CreditCardOutlined, SwapOutlined, CloseOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

interface CartDropdownProps {
  isVisible: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ isVisible, onClose, onCheckout }) => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  return (
    <div className={`fixed top-0 right-0 w-96 h-screen bg-white shadow-lg overflow-hidden z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-semibold">Giỏ hàng</h3>
          <Button 
            icon={<CloseOutlined />} 
            onClick={onClose}
            type="text"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-30 transition-colors"
          />
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item
                className="flex items-center cursor-pointer"
                onClick={() => handleProductClick(item.id)}
              >
                <img src={item.coverImage} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                <div className="flex-grow">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p>{item.quantity} x {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                </div>
                <Button 
                  icon={<CloseOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(item.id);
                  }}
                  className="flex items-center justify-center w-5 h-5 rounded-full border bg-[#9F9F9F] text-white"
                  type="text"
                />
              </List.Item>
            )}
          />
        </div>
        <div className="border-t p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Tổng cộng:</span>
            <span className="font-bold text-lg">
              {subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </span>
          </div>
          <div className="flex justify-between space-x-2">
            <Link to="/cart" onClick={onClose}>
              <Button type="default" icon={<ShoppingCartOutlined />}>
                Giỏ hàng
              </Button>
            </Link>
            <Button 
              type="primary" 
              icon={<CreditCardOutlined />} 
              onClick={() => {
                onCheckout();
                onClose();
              }}
            >
              Thanh toán
            </Button>
            <Button type="default" icon={<SwapOutlined />}>
              So sánh
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;