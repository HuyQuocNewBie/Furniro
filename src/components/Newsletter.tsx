import React, { useState } from 'react';
import { Input, Button, message } from 'antd';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Ở đây bạn sẽ gửi email đến server
      console.log('Đăng ký email:', email);
      message.success('Cảm ơn bạn đã đăng ký!');
      setEmail('');
    } else {
      message.error('Vui lòng nhập email của bạn');
    }
  };

  return (
    <section className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Đăng ký nhận tin</h2>
        <p className="text-center text-white mb-8">Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex">
          <Input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button type="primary" htmlType="submit" className="bg-primary hover:bg-primary/80">
            Đăng ký
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;