import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';
import Header from '../components/Header';

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };

  const [paymentMethod, setPaymentMethod] = useState<string>('');

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
      <PageBanner title="Checkout" backgroundImage="/images/banner.svg" />
      <div className="container mx-auto my-8 px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Div cha lớn */}
          <div className="w-full flex flex-col md:flex-row justify-between">
            {/* Div cha nhỏ thứ nhất */}
            <div className="w-full md:w-2/3 md:pr-4 mb-8 md:mb-0">
              <div className="bg-white rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Billing details</h1>
                <div className="flex flex-wrap -mx-2 mb-4">
                  <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                    <label>First Name</label>
                    <input type="text" className="w-full border rounded-lg h-[75px] p-2" />
                  </div>
                  <div className="w-full md:w-1/2 px-2">
                    <label>Last Name</label>
                    <input type="text" className="w-full border rounded-lg h-[75px] p-2" />
                  </div>
                </div>
                <div className="mb-4">
                  <label>Company Name (Optional)</label>
                  <input type="text" className="w-full border rounded-lg h-[75px] p-2" />
                </div>
                <div className="mb-4">
                  <label>Country / Region</label>
                  <select className="w-full border rounded-lg h-[75px] p-2">
                    <option>Choose a country</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>Vietnam</option>
                    {/* Thêm các tùy chọn quốc gia */}
                  </select>
                </div>
                <div className="mb-4">
                  <label>Street address</label>
                  <input type="text" className="w-full border rounded-lg h-[75px] p-2" />
                </div>
                <div className="mb-4">
                  <label>Town / City</label>
                  <input type="text" className="w-full border rounded-lg h-[75px] p-2" />
                </div>
                <div className="mb-4">
                  <label>Province</label>
                  <select className="w-full border rounded-lg h-[75px] p-2">
                    <option>Choose a province</option>
                    <option>California</option>
                    <option>Ontario</option>
                    <option>London</option>
                    <option>New South Wales</option>
                    <option>Ho Chi Minh</option>
                    {/* Thêm các tùy chọn tỉnh */}
                  </select>
                </div>
                <div className="mb-4">
                  <label>ZIP code</label>
                  <input type="text" className="w-full border rounded-lg h-[75px] p-2" />
                </div>
                <div className="mb-4">
                  <label>Phone</label>
                  <input type="text" className="w-full border rounded-lg h-[75px] p-2" />
                </div>
                <div className="mb-4">
                  <label>Email address</label>
                  <input type="email" className="w-full border rounded-lg h-[75px] p-2" />
                </div>
                <div className="mb-4">
                  <input type="text" placeholder="Additional information" className="w-full border rounded-lg h-[75px] p-2" />
                </div>
              </div>
            </div>
            {/* Div cha nhỏ thứ hai */}
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-lg p-6">
                <div className="flex justify-between mb-4">
                  <h1 className="text-2xl font-bold">Product</h1>
                  <h1 className="text-2xl font-bold">Subtotal</h1>
                </div>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between mb-4">
                    <div>
                      <h1 className="text-sm">{item.name} x {item.quantity}</h1>
                    </div>
                    <div>
                      <p>{(item.price * item.quantity).toLocaleString()} đ</p>
                    </div>
                  </div>
                ))}
                {getDiscountTag() && (
                  <div className="flex justify-between mb-4">
                    <span>Discount:</span>
                    <span>{getDiscountTag()}</span>
                  </div>
                )}
                <div className="flex justify-between mb-4">
                  <span>Subtotal:</span>
                  <span>{calculateSubtotal().toLocaleString()} đ</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Total:</span>
                  <span>{calculateTotal().toLocaleString()} đ</span>
                </div>
                <div className="border-t border-gray-300 my-4"></div>
                <div className="mb-4">
                  <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                </div>
                <div className="mb-4">
                  <input
                    type="radio"
                    name="payment"
                    id="bank"
                    value="Direct Bank Transfer"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="bank">Direct Bank Transfer</label>
                  <br />
                  <input
                    type="radio"
                    name="payment"
                    id="cod"
                    value="Cash On Delivery"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="cod">Cash On Delivery</label>
                </div>
                <div className="mb-4">
                  <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <a href="#">privacy policy</a>.</p>
                </div>
                <div className="flex justify-center">
                  <button className="w-[318px] h-[64px] text-[#000000] border-[#000000] py-2 mt-4 rounded-[15px] border-[1px] hover:bg-primary-dark transition-colors">
                    Place order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;