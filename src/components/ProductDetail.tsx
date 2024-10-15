import React, { useState } from 'react';
import { Modal, Button, InputNumber, Tabs } from 'antd';
import ProductReview from './ProductReview';

const { TabPane } = Tabs;

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductDetailProps {
  product: Product | null;
  isVisible: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, isVisible, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    console.log('Đánh giá mới:', review);
    // Ở đây, bạn sẽ gửi đánh giá đến server
  };

  return (
    <Modal
      title={product.name}
      open={isVisible}  // Thay đổi từ visible sang open
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img src={product.image} alt={product.name} className="w-full rounded-lg" />
        </div>
        <div className="md:w-1/2 md:pl-6">
          <p className="text-2xl font-bold text-primary mb-2">
            {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </p>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Mô tả" key="1">
              <p className="mb-4">{product.description}</p>
            </TabPane>
            <TabPane tab="Đánh giá" key="2">
              <ProductReview productId={product.id} onSubmit={handleReviewSubmit} />
            </TabPane>
          </Tabs>
          <div className="flex items-center mt-4">
            <span className="mr-2">Số lượng:</span>
            <InputNumber min={1} value={quantity} onChange={(value) => setQuantity(value as number)} />
          </div>
          <Button
            type="primary"
            size="large"
            className="mt-4"
            onClick={() => {
              onAddToCart(product, quantity);
              onClose();
            }}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetail;