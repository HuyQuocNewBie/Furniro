import React, { useState, useEffect, useMemo } from 'react';
import { Pagination, Select } from 'antd';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FeaturedProducts from '../components/FeaturedProducts';

const { Option } = Select;

interface Product {
  id: number;
  name: string;
  price: number;
  coverImage: string;
  description: string;
  category: string;
  tag?: string;
  originalPrice?: number;
}

const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('default');

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        if (data && data.featuredProducts) {
          setProducts(data.featuredProducts);
        } else {
          console.error('Dữ liệu sản phẩm không hợp lệ:', data);
        }
      })
      .catch(error => console.error('Lỗi khi tải sản phẩm:', error));
  }, []);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [products, sortBy]);

  const currentProducts = useMemo(() => {
    if (productsPerPage === null) {
      return sortedProducts;
    }
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [sortedProducts, currentPage, productsPerPage]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleProductsPerPageChange = (value: number | null) => {
    setProductsPerPage(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <Header />
      <PageBanner title="Cửa hàng" backgroundImage="/images/banner.svg" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <p>Hiển thị {productsPerPage ? `${Math.min(currentPage * productsPerPage, sortedProducts.length)} trong số ` : ''}{sortedProducts.length} sản phẩm</p>
          </div>
          <div className="flex space-x-4">
            <Select
              defaultValue={null}
              style={{ width: 150 }}
              onChange={handleProductsPerPageChange}
            >
              <Option value={null}>Hiển thị</Option>
              <Option value={4}>4 sản phẩm</Option>
              <Option value={8}>8 sản phẩm</Option>
              <Option value={12}>12 sản phẩm</Option>
              <Option value={16}>16 sản phẩm</Option>
            </Select>
            <p className='leading-[30px]'>Sắp xếp theo:</p>
            <Select
              defaultValue={sortBy}
              style={{ width: 150 }}
              onChange={handleSortChange}
            >
              <Option value="default">Mặc định</Option>
              <Option value="price-asc">Giá tăng dần</Option>
              <Option value="price-desc">Giá giảm dần</Option>
              <Option value="name-asc">Tên A-Z</Option>
              <Option value="name-desc">Tên Z-A</Option>
            </Select>
          </div>
        </div>

        <FeaturedProducts products={currentProducts} />

        {productsPerPage && (
          <div className="mt-8 flex justify-center">
            <Pagination
              current={currentPage}
              total={sortedProducts.length}
              pageSize={productsPerPage}
              onChange={onPageChange}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default StorePage;