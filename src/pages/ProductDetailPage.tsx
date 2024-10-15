import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  InputNumber,
  Tabs,
  Rate,
  Tooltip,
} from "antd";
import {
  ShoppingCartOutlined,
  PlusOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  InfoCircleOutlined,
  HeartOutlined,
  ShareAltOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { useCart } from "../contexts/CartContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";

const { TabPane } = Tabs;

interface Product {
  id: number;
  name: string;
  price: number;
  coverImage: string[];
  description: string;
  category: string;
  totalRating: number;
  reviewCount: number;
  isNew: boolean;
  isOnSale: boolean;
  originalPrice: number;
  images: string[];
}

interface Review {
  rating: number;
  comment: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("Red");
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [rating, setRating] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const calculateDiscount = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        const response = await fetch("/products.json");
        const data = await response.json();
        const allProducts = data.featuredProducts;

        const foundProduct = allProducts.find(
          (p: Product) => p.id === Number(id)
        );
        if (foundProduct) {
          const savedReviews = JSON.parse(
            localStorage.getItem(`product_${id}_reviews`) || "[]"
          );
          const totalRating = savedReviews.reduce(
            (sum: number, review: Review) => sum + review.rating,
            0
          );
          const reviewCount = savedReviews.length;

          setProduct({
            ...foundProduct,
            totalRating: reviewCount > 0 ? totalRating / reviewCount : 0,
            reviewCount: reviewCount,
          });
          setMainImageIndex(0);

          // Fetch related products
          const otherProducts = allProducts.filter(
            (p: Product) => p.id !== foundProduct.id
          );
          const shuffled = otherProducts.sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 4);
          setRelatedProducts(selected);
        } else {
          navigate("/404");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/404");
      }
    };

    if (id) {
      fetchProductAndRelated();
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity,
        size: selectedSize,
        color: selectedColor,
      });
    }
  };

  const handleReviewSubmit = () => {
    if (product && rating > 0) {
      const newReview = { rating, comment: "" };
      const savedReviews = JSON.parse(
        localStorage.getItem(`product_${id}_reviews`) || "[]"
      );
      savedReviews.push(newReview);
      localStorage.setItem(
        `product_${id}_reviews`,
        JSON.stringify(savedReviews)
      );

      const newTotalRating =
        savedReviews.reduce(
          (sum: number, review: Review) => sum + review.rating,
          0
        ) / savedReviews.length;
      const newReviewCount = savedReviews.length;

      setProduct({
        ...product,
        totalRating: newTotalRating,
        reviewCount: newReviewCount,
      });

      // Reset rating
      setRating(0);
    }
  };

  const handleImageSwap = (index: number) => {
    setMainImageIndex(index);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  if (!product) {
    return <div>Đang tải...</div>;
  }

  const mainImage = product.images[mainImageIndex];
  const thumbnails = product.images.slice(0, 4);

  return (
    <div className=" overflow-hidden">
      <Header />
      <div className="mb-8 text-sm flex bg-[#f9f1e7] w-full h-[100px] items-center">
        <div className="flex mx-auto md:mx-[90px]">
          <Link to="/" className="text-[#9F9F9F] font-normal text-[16px]">
            Home
          </Link>
          <span className="mx-2 font-bold">&gt;</span>
          <Link to="/store" className="text-[#9F9F9F] font-normal text-[16px]">
            Shop
          </Link>
          <span className="mx-2 font-bold">&gt;</span>
          <span className="text-gray-400">|</span>
          <span className="ml-2 text-[#000000] font-normal text-[16px]">
            {product.name}
          </span>
        </div>
      </div>

      <div className="mx-auto md:mx-[90px] mb-1 px-4">
        <Row gutter={[16, 32]}>
          <Col xs={24} md={12} className="flex">
            <div className="flex flex-col mr-4 w-1/5">
              {thumbnails.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className={`w-full h-20 object-cover rounded-lg mb-4 cursor-pointer ${
                    index === mainImageIndex ? "border-2 border-primary" : ""
                  }`}
                  onClick={() => handleImageSwap(index)}
                />
              ))}
            </div>
            <div className="w-4/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainImageIndex}
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-auto object-cover rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>
          </Col>
          <Col xs={24} md={12} className="pl-8">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-xl md:text-2xl font-semibold text-primary mb-4">
                {product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              {product.reviewCount > 0 && (
                <div className="flex items-center mb-4">
                  <Rate disabled allowHalf value={product.totalRating} />
                  <span className="ml-2">|</span>
                  <span className="ml-2">
                    {product.reviewCount} Customer Review
                  </span>
                </div>
              )}
            </div>

            <div className="mb-8">
              <p className="mb-3">Size:</p>
              <div className="flex space-x-2 mb-6">
                {["L", "XL", "XS"].map((size) => (
                  <Button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    type={selectedSize === size ? "primary" : "default"}
                  >
                    {size}
                  </Button>
                ))}
              </div>
              <p className="mb-3">Color:</p>
              <div className="flex space-x-2 mb-6">
                {["Red", "Blue", "Green"].map((color) => (
                  <Button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    type={selectedColor === color ? "primary" : "default"}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      borderColor: color.toLowerCase(),
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <InputNumber
                  min={1}
                  value={quantity}
                  onChange={(value) => setQuantity(value as number)}
                />
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </Button>
                <Button icon={<PlusOutlined />}>Compare</Button>
              </div>
            </div>

            <div className="border-b border-[#D9D9D9] pb-4 mb-6"></div>

            <div>
              <p className="mb-3">Category: {product.category}</p>
              <p className="mb-3">Share:</p>
              <div className="flex space-x-4">
                <FacebookOutlined className="text-2xl" />
                <InstagramOutlined className="text-2xl" />
                <TwitterOutlined className="text-2xl" />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="mx-auto md:mx-[90px] mb-8 px-4">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Description" key="1">
            {product.description}
          </TabPane>
          <TabPane tab="Additional Information" key="2">
            Additional information about the product...
          </TabPane>
          <TabPane tab={`Reviews (${product.reviewCount})`} key="3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <p className="mr-2">Đánh giá của bạn:</p>
                <Rate value={rating} onChange={setRating} />
              </div>
              <Button type="primary" onClick={handleReviewSubmit}>
                Gửi đánh giá
              </Button>
            </div>
          </TabPane>
        </Tabs>
      </div>

      <div className="mx-auto md:mx-[90px] mb-8 px-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Related Products
        </h1>
        <Row gutter={[16, 16]}>
          {relatedProducts.map((relatedProduct) => (
            <Col
              key={relatedProduct.id}
              xs={12} // Hiển thị 2 sản phẩm mỗi hàng ngang trên điện thoại
              sm={12}
              md={6}
              onClick={() => handleProductClick(relatedProduct.id)} // Thêm sự kiện click cho điện thoại
              className="cursor-pointer"
            >
              <div className="relative group overflow-hidden rounded-lg shadow-md">
                <div className="relative w-full pb-[89%]">
                  <img
                    alt={relatedProduct.name}
                    src={relatedProduct.coverImage}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-2 right-2 flex flex-col items-end space-y-2">
                    {relatedProduct.isOnSale &&
                      relatedProduct.originalPrice && (
                        <span className="bg-red-500 text-white w-12 h-12 flex items-center justify-center text-sm font-bold rounded-full">
                          -{calculateDiscount(
                            relatedProduct.originalPrice,
                            relatedProduct.price
                          )}
                          %
                        </span>
                      )}
                    {relatedProduct.isNew && !relatedProduct.isOnSale && (
                      <span className="bg-green-500 text-white w-12 h-12 flex items-center justify-center text-sm font-bold rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="text-base font-semibold mb-1">
                    {relatedProduct.name}
                  </h3>
                  <Tooltip title={relatedProduct.description}>
                    <p className="text-gray-500 text-xs mb-1 truncate">
                      {relatedProduct.description.length > 50
                        ? relatedProduct.description.substring(0, 50) + "..."
                        : relatedProduct.description}
                      <InfoCircleOutlined className="ml-1" />
                    </p>
                  </Tooltip>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">
                      {relatedProduct.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    {relatedProduct.originalPrice && (
                      <span className="text-gray-400 line-through text-xs">
                        {relatedProduct.originalPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex">
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    className="mb-4"
                    onClick={() => handleAddToCart(relatedProduct)}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                  <div className="flex space-x-4">
                    <Button icon={<ShareAltOutlined />}>Chia sẻ</Button>
                    <Button icon={<SwapOutlined />}>So sánh</Button>
                    <Button icon={<HeartOutlined />} className="text-red-500">
                      Thích
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button type="primary" size="large">
            Show More
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
