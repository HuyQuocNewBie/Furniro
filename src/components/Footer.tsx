import React from 'react';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">LOGO</h3>
            <p className="text-sm text-gray-400 mb-4">
              Chúng tôi cung cấp các giải pháp nội thất độc đáo và sang trọng cho không gian sống của bạn.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookOutlined style={{ fontSize: '20px' }} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramOutlined style={{ fontSize: '20px' }} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterOutlined style={{ fontSize: '20px' }} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="text-sm text-gray-400">
              <li className="mb-2"><a href="#" className="hover:text-white transition-colors">Trang chủ</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition-colors">Sản phẩm</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition-colors">Về chúng tôi</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Liên hệ</h3>
            <ul className="text-sm text-gray-400">
              <li className="mb-2 flex items-center">
                <EnvironmentOutlined className="mr-2" /> 123 Đường ABC, Quận XYZ, TP.HCM
              </li>
              <li className="mb-2 flex items-center">
                <MailOutlined className="mr-2" /> info@example.com
              </li>
              <li className="mb-2 flex items-center">
                <PhoneOutlined className="mr-2" /> (123) 456-7890
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Đăng ký nhận tin</h3>
            <p className="text-sm text-gray-400 mb-4">Nhận thông tin mới nhất về sản phẩm và khuyến mãi</p>
            <div className="flex">
              <Input placeholder="Email của bạn" className="mr-2" />
              <Button type="primary">Đăng ký</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; 2023 Tên Công Ty. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;