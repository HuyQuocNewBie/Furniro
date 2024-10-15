import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import Header from '../components/Header';
interface Product {
  id: number;
  name: string;
  price: number;
  coverImage: string;
  description: string;
  category: string;
  isOnSale?: boolean;
  isNew?: boolean;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data.featuredProducts);
        updateVisibleProducts(data.featuredProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const handleResize = () => updateVisibleProducts(products);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [products]);

  const updateVisibleProducts = (allProducts: Product[]) => {
    const isMobile = window.innerWidth < 768;
    const productCount = isMobile ? 4 : 8;
    setVisibleProducts(allProducts.slice(0, productCount));
  };

  const handleShowMore = () => {
    navigate('/store');
  };

  return (
    <>
      <Header />
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts products={visibleProducts} />
      {visibleProducts.length < products.length && (
        <div className="text-center mt-8 mb-16">
          <button
            onClick={handleShowMore}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Xem thêm
          </button>
        </div>
      )}
      <Footer />
    </>
  );
};

export default HomePage;