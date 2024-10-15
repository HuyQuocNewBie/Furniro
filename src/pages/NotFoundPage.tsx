import React from 'react';
import { Link } from 'react-router-dom';
import { motion} from 'framer-motion';
import { ArrowLeftOutlined } from '@ant-design/icons';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-md w-full space-y-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            404
          </h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Ôi không! Trang không tìm thấy
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Có vẻ như trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            to="/"
            className="mt-8 inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-lg"
          >
            <ArrowLeftOutlined className="mr-2" />
            Trở về trang chủ
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;