import React, { useState } from 'react';
import { Form, Input, Button, Rate } from 'antd';

const { TextArea } = Input;

interface ProductReviewProps {
  productId: number;
  onSubmit: (review: { rating: number; comment: string }) => void;
}

const ProductReview: React.FC<ProductReviewProps> = ({ productId, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { rating: number; comment: string }) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item name="rating" label="Đánh giá" rules={[{ required: true, message: 'Vui lòng đánh giá sản phẩm' }]}>
        <Rate />
      </Form.Item>
      <Form.Item name="comment" label="Nhận xét" rules={[{ required: true, message: 'Vui lòng nhập nhận xét' }]}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Gửi đánh giá
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductReview;