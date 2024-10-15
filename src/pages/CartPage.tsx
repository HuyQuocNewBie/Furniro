import React from 'react';
import { useCart } from '../contexts/CartContext';
import { DeleteOutlined } from '@ant-design/icons';
import PageBanner from '../components/PageBanner';
import Header from '../components/Header';
import Footer from '../components/Footer'; // Thêm import này
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Thay đổi hàm này
  const getDiscountTag = () => {
    const discountTags = cartItems
      .filter(item => item.tag && item.tag !== 'New')
      .map(item => item.tag);
    return [...new Set(discountTags)].join(', ');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.tag && item.tag !== 'New') {
        const discountPercentage = parseInt(item.tag);
        return total + (item.price * item.quantity * (100 - discountPercentage) / 100);
      }
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <>
      <Header />
      <PageBanner title="Giỏ hàng" backgroundImage="/images/banner.svg" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-2/3 md:pr-4 mb-8 md:mb-0">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between border-b pb-4">
                <div className="w-2/5">Sản phẩm</div>
                <div className="w-1/5 text-center">Giá</div>
                <div className="w-1/5 text-center">Số lượng</div>
                <div className="w-1/5 text-center">Tổng cộng</div>
                <div className="w-10"></div>
              </div>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center hover:bg-gray-100 py-4">
                  <div className="w-2/5 flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                    <span>{item.name}</span>
                  </div>
                  <div className="w-1/5 flex justify-center items-center">
                    {item.price.toLocaleString()} đ
                  </div>
                  <div className="w-1/5 flex justify-center items-center">
                    {item.quantity}
                  </div>
                  <div className="w-1/5 flex justify-center items-center">
                    {(item.price * item.quantity).toLocaleString()} đ
                  </div>
                  <div className="w-10 flex justify-center items-center">
                    <button onClick={() => removeFromCart(item.id)}>
                      <DeleteOutlined className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Tổng giỏ hàng</h2>
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Tạm tính:</span>
                  <span>{calculateSubtotal().toLocaleString()} đ</span>
                </div>
                {getDiscountTag() && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Giảm giá:</span>
                    <span>{getDiscountTag()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng:</span>
                  <span>{calculateTotal().toLocaleString()} đ</span>
                </div>
              </div>
              <button
                className="w-full bg-primary text-white py-2 mt-4 rounded hover:bg-primary-dark transition-colors"
                onClick={() => navigate('/checkout', { state: { cartItems } })}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Thêm dòng này */}
    </>
  );
};

export default CartPage;