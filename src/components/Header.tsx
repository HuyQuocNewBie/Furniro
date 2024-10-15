import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Menu, Avatar } from "antd";
import { LogoutOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { message, Input } from "antd";
import CartDropdown from "./CartDropdown";
import { useCart } from "../contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isCartDropdownVisible, setIsCartDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const menuItems: { key: string; label: string }[] = [
    { key: "", label: "Home" },
    { key: "store", label: "Shop" },
    { key: "blog", label: "Blog" },
    { key: "contact", label: "Contact" },
  ];

  interface Product {
    id: number;
    name: string;
    coverImage: string;
  }

  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.featuredProducts) {
          setAllProducts(data.featuredProducts);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
  };

  const userMenu = (
    <Menu
      items={[
        {
          key: 'profile',
          icon: <UserOutlined />,
          label: <Link to="/profile">Profile</Link>,
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Đăng xuất',
          onClick: handleLogout,
        },
      ]}
    />
  );

  message.config({
    top: 60,
    duration: 2,
    maxCount: 3,
    rtl: true,
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
  };

  const [currentUser, setCurrentUser] = useState<{ name: string; avatar: string | null } | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(user);
  }, []);

  const handleCheckout = () => {
    setIsCartDropdownVisible(false);
    navigate('/checkout', { state: { cartItems } });
  };

  return (
    <header className="bg-white relative z-40">
      <div className="container px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          <img src="/images/logo.jpg" alt="" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={`/${item.key}`}
              className="hover:text-primary"
              onClick={(e) => {
                if (item.key === "store") {
                  e.preventDefault();
                  navigate("/store");
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div
          className="hidden md:flex items-center space-x-4 relative"
          ref={cartRef}
        >
          {currentUser ? (
            <Dropdown overlay={userMenu} trigger={['click']}>
              <span className="text-gray-600 cursor-pointer flex items-center">
                <Avatar 
                  src={currentUser.avatar} 
                  icon={!currentUser.avatar && <UserOutlined />}
                  className="mr-2"
                />
                Hi! {currentUser.name}
              </span>
            </Dropdown>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-primary">
              <UserOutlined className="text-xl hover:text-primary cursor-pointer transition-colors" />
            </Link>
          )}
          <AnimatePresence>
            {isSearchVisible ? (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "250px" }}
                exit={{ width: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Input
                  autoFocus
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  onBlur={() => setIsSearchVisible(false)}
                />
                {searchResults.length > 0 && (
                  <div className="absolute z-10 w-[77%] bg-white shadow-lg rounded-b-lg mt-1">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="p-2 hover:bg-gray-100 flex items-center"
                        onClick={() => {
                          setSearchTerm("");
                          setSearchResults([]);
                          setIsSearchVisible(false);
                        }}
                      >
                        <img 
                          src={product.coverImage} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover mr-2"
                        />
                        <span>{product.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <SearchOutlined
                className="text-xl hover:text-primary cursor-pointer transition-colors"
                onClick={() => setIsSearchVisible(true)}
              />
            )}
          </AnimatePresence>
          <div className="relative">
            <ShoppingCartOutlined
              className="text-2xl hover:text-primary cursor-pointer transition-colors"
              onClick={() => setIsCartDropdownVisible(true)}
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between w-full">
          <div className="relative w-full">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              className="w-[70%] mx-[55px]"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="absolute z-10 w-[70%] left-[15%] bg-white shadow-lg rounded-b-lg mt-1">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className=" p-2 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setSearchTerm("");
                      setSearchResults([]);
                      toggleMobileMenu();
                    }}
                  >
                    <img 
                      src={product.coverImage} 
                      alt={product.name} 
                      className="w-12 h-12 object-cover mr-2"
                    />
                    <span>{product.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <MenuOutlined
            className="text-2xl cursor-pointer"
            onClick={toggleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <Link to="/" className="text-2xl font-bold text-primary">
                Logo
              </Link>
              <CloseOutlined className="text-2xl" onClick={toggleMobileMenu} />
            </div>
            <nav className="p-4">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  to={`/${item.key}`}
                  className="block py-2 hover:text-primary"
                  onClick={(e) => {
                    if (item.key === "store") {
                      e.preventDefault();
                      navigate("/store");
                    }
                    toggleMobileMenu();
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 flex flex-col border-t">
              {currentUser ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Avatar 
                        src={currentUser.avatar} 
                        icon={!currentUser.avatar && <UserOutlined />}
                        className="mr-2"
                      />
                      <span className="mr-2">Hi! {currentUser.name}</span>
                      <DownOutlined 
                        className={`transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      />
                    </div>
                    <div className="relative">
                      <ShoppingCartOutlined
                        className="text-2xl"
                        onClick={() => {
                          setIsCartDropdownVisible(true);
                          toggleMobileMenu();
                        }}
                      />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                          {cartItems.length}
                        </span>
                      )}
                    </div>
                  </div>
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <Link to="/profile" className="flex items-center py-2" onClick={toggleMobileMenu}>
                          <UserOutlined className="mr-2" />
                          <span>Profile</span>
                        </Link>
                        <div className="flex items-center py-2 cursor-pointer" onClick={() => { handleLogout(); toggleMobileMenu(); }}>
                          <LogoutOutlined className="mr-2" />
                          <span>Đăng xuất</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="flex justify-center gap-8">
                  <Link to="/login" className="flex items-center" onClick={toggleMobileMenu}>
                    <UserOutlined className="text-2xl" />
                  </Link>
                  <div className="relative">
                    <ShoppingCartOutlined
                      className="text-2xl"
                      onClick={() => {
                        setIsCartDropdownVisible(true);
                        toggleMobileMenu();
                      }}
                    />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Dropdown */}
      {isCartDropdownVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCartDropdownVisible(false)}
        ></div>
      )}
      <CartDropdown
        isVisible={isCartDropdownVisible}
        onClose={() => setIsCartDropdownVisible(false)}
        onCheckout={handleCheckout}
      />
    </header>
  );
};

export default Header;
