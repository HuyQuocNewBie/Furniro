import React from 'react';
import { Modal, List, Button } from 'antd';
import { useCart } from '../contexts/CartContext';

interface CartModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isVisible, onClose }) => {
  const { cartItems, removeFromCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Modal
      title="Giỏ hàng"
      open={isVisible}  // Thay đổi từ visible sang open
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
        <Button key="checkout" type="primary" onClick={() => console.log('Thanh toán')}>
          Thanh toán
        </Button>,
      ]}
    >
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="delete" onClick={() => removeFromCart(item.id)}>
                Xóa
              </Button>
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={`Số lượng: ${item.quantity}`}
            />
            <div>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
          </List.Item>
        )}
      />
      <div className="mt-4 text-right font-bold">
        Tổng cộng: {total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
      </div>
    </Modal>
  );
};

export default CartModal;