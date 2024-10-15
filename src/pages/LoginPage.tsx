import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from '../firebase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FirebaseError } from 'firebase/app';
import { updateProfile } from "firebase/auth";
import { Link } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const onFinish = async (values: User) => {
    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        const user = auth.currentUser;
        if (user) {
          const userName = user.displayName || values.email.split('@')[0];
          localStorage.setItem('currentUser', JSON.stringify({ 
            name: userName,
            email: user.email,
            avatar: user.photoURL
          }));
          toast.success(`Xin chào, ${userName}! Đăng nhập thành công!`);
          navigate('/');
        }
      } else {
        // Xử lý đăng ký (giữ nguyên như cũ)
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;
        
        // Cập nhật displayName cho người dùng mới
        await updateProfile(user, {
          displayName: values.name || values.email.split('@')[0]
        });

        toast.success('Tạo tài khoản thành công! Vui lòng đăng nhập.');
        setIsLoginMode(true);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            toast.error('Email hoặc mật khẩu của bạn đã sai. Vui lòng nhập lại!');
            break;
          case 'auth/email-already-in-use':
            toast.error('Email này đã được sử dụng. Vui lòng chọn email khác.');
            break;
          default:
            toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
      } else {
        toast.error('Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem('currentUser', JSON.stringify({ 
        name: user.displayName, 
        email: user.email,
        avatar: user.photoURL
      }));
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      toast.error(`Đăng nhập thất bại: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      localStorage.setItem('currentUser', JSON.stringify({ 
        name: user.displayName, 
        email: user.email,
        avatar: user.photoURL
      }));
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(`Đăng nhập thất bại: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto my-12 px-4 flex-shrink">
        <div className="relative w-[60%] h-[500px] max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
          {/* Login Form */}
          <div className={`absolute top-0 ${isLoginMode ? 'left-0' : 'right-0'} w-1/2 h-full p-8 mt-[50px] transition-all duration-700 ease-in-out`}>
            <h2 className="text-2xl text-center font-bold mb-6">{isLoginMode ? 'Đăng nhập' : 'Tạo tài khoản'}</h2>
            {isLoginMode && (
              <div className="flex justify-center space-x-4 mb-4">
                <Button 
                  onClick={handleGoogleSignIn} 
                  icon={<GoogleOutlined />} 
                  className="rounded-lg w-9 h-9 flex items-center justify-center"
                />
                <Button 
                  onClick={handleFacebookSignIn} 
                  icon={<FacebookOutlined />} 
                  className="rounded-lg w-9 h-9 flex items-center justify-center"
                />
              </div>
            )}
            {isLoginMode && <p className="text-center text-[14px] font-normal mb-4">hoặc sử dụng email và mật khẩu</p>}
            <Form name={isLoginMode ? "login" : "register"} onFinish={onFinish}>
              {!isLoginMode && (
                <Form.Item name="name" rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}>
                  <Input prefix={<UserOutlined />} placeholder="Tên" />
                </Form.Item>
              )}
              <Form.Item 
                name="email" 
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Vui lòng nhập email hợp lệ!' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item 
                name="password" 
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu!' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
              </Form.Item>
              {!isLoginMode && (
                <Form.Item
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" />
                </Form.Item>
              )}
              {isLoginMode && (
                <div className="text-right mb-4">
                  <Link to="/forgot-password" className="text-blue-500">Quên mật khẩu?</Link>
                </div>
              )}
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  {isLoginMode ? "Đăng nhập" : "Đăng ký"}
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Overlay */}
          <div 
            className={`absolute top-0 w-1/2 h-full bg-gradient-to-r from-blue-500 to-purple-500 text-white transition-all duration-1000 ease-in-out ${isLoginMode ? 'right-0 rounded-l-[120px]' : 'left-0 rounded-r-[120px]'}`}
          >
            <div className="flex flex-col justify-center items-center h-full p-8">
              <h2 className="text-3xl font-bold mb-4">
                {isLoginMode ? "Chào mừng bạn!" : "Chào mừng trở lại!"}
              </h2>
              <p className="mb-6 text-center">
                {isLoginMode 
                  ? "Bạn chưa có tài khoản? Hãy đăng ký để trải nghiệm đầy đủ tính năng của chúng tôi!" 
                  : "Đã có tài khoản? Hãy đăng nhập để tiếp tục trải nghiệm!"}
              </p>
              <Button 
                onClick={toggleMode} 
                className="border-none text-black rounded-full px-6 py-2"
              >
                {isLoginMode ? "Đăng ký" : "Đăng nhập"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;