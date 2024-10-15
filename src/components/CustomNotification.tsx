import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';

interface CustomNotificationProps {
  message: string;
}

const CustomNotification: React.FC<CustomNotificationProps> = ({ message }) => {
  return (
    <div className="flex items-center bg-green-500 text-white p-6 rounded-lg shadow-lg">
      <CheckCircleOutlined className="text-3xl mr-4" />
      <span className="text-xl font-semibold">{message}</span>
    </div>
  );
};

export default CustomNotification;