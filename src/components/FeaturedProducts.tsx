import React, { useState, useEffect } from 'react';
import { Button, Tooltip, message, Row, Col } from 'antd';
import { ShoppingCartOutlined, ShareAltOutlined, SwapOutlined, HeartOutlined, HeartFilled, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  coverImage: string;
  description: string;
  category: string;
  tag?: string;
}

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1, image: product.coverImage });
  };

  const handleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleShare = (product: Product) => {
    console.log('Chia sẻ sản phẩm:', product.name);
    message.info('Chức năng chia sẻ đang được phát triển');
  };

  const handleCompare = (product: Product) => {
    console.log('So sánh sản phẩm:', product.name);
    message.info('Chức năng so sánh đang được phát triển');
  };

  const handleProductClick = (productId: number) => {
    if (isMobile) {
      navigate(`/product/${productId}`);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (products.length === 0) {
    return <div>Không có sản phẩm nào.</div>;
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <Row gutter={[16, 16]}>
          {products.map(product => (
            <Col key={product.id} xs={12} sm={12} md={8} lg={6}>
              <div 
                className={`relative ${!isMobile ? 'group' : ''} overflow-hidden rounded-lg shadow-md cursor-pointer`}
                onClick={() => handleProductClick(product.id)}
              >
                <div className="relative w-full pb-[89%]">
                  <img 
                    alt={product.name} 
                    src={product.coverImage} 
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  {product.tag && (
                    <span className={`absolute top-2 right-2 w-14 h-14 flex items-center justify-center text-sm font-bold rounded-full ${
                      product.tag === 'New' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="p-2">
                  <h3 className="text-base font-semibold mb-1">{product.name}</h3>
                  <Tooltip title={product.description}>
                    <p className="text-gray-500 text-xs mb-1 truncate">
                      {product.description.length > 50 
                        ? product.description.substring(0, 50) + '...' 
                        : product.description}
                      <InfoCircleOutlined className="ml-1" />
                    </p>
                  </Tooltip>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">
                      {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-xs">
                        {product.originalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      </span>
                    )}
                  </div>
                </div>
                {!isMobile && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      className="mb-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                    <div className="flex space-x-4">
                      <Button icon={<ShareAltOutlined />} onClick={(e) => {
                        e.stopPropagation();
                        handleShare(product);
                      }}>
                        Chia sẻ
                      </Button>
                      <Button icon={<SwapOutlined />} onClick={(e) => {
                        e.stopPropagation();
                        handleCompare(product);
                      }}>
                        So sánh
                      </Button>
                      <Button
                        icon={likedProducts.includes(product.id) ? <HeartFilled /> : <HeartOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(product.id);
                        }}
                        className={likedProducts.includes(product.id) ? 'text-red-500' : ''}
                      >
                        Thích
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default FeaturedProducts;