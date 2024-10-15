import React from 'react';
import { ShoppingOutlined } from '@ant-design/icons';

interface OrdersPageProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: 'all', label: 'Tất cả đơn hàng' },
    { key: 'new', label: 'Đơn hàng mới' },
    { key: 'shipping', label: 'Đang giao' },
    { key: 'delivered', label: 'Đã giao' },
    { key: 'cancelled', label: 'Đơn hàng hủy' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-semibold flex items-center">
            <ShoppingOutlined className="mr-2" /> Đơn hàng
          </h1>
        </div>
        <div className="flex justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`pb-2 px-4 ${
                activeTab === tab.key
                  ? 'text-[#ffcf20] border-b-2 border-[#ffcf20]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center text-gray-500 py-12">
          Đơn hàng trống
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;