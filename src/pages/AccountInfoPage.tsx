import React, { useState, useEffect } from 'react';
import { Avatar, Button, Input, Select, Modal, Upload, message } from 'antd';
import { UserOutlined, EditOutlined, DownOutlined} from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { toast } from 'react-toastify';
import { updateProfile } from "firebase/auth";
import { auth } from '../firebase'; // Thêm import này
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage"; // Thêm import này

const { Option } = Select;

const AccountInfoPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<{ name: string; avatar: string | null; email: string; phone: string; password: string; gender: string; birthDay: string; birthMonth: string; birthYear: string } | null>(null);
  const [editedUser, setEditedUser] = useState<{ name: string; avatar: string | null; email: string; phone: string; password: string; gender: string; birthDay: string; birthMonth: string; birthYear: string } | null>(null);
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(user);
    setEditedUser(user);
  }, []);

  const handleAvatarChange = () => {
    setIsAvatarModalVisible(true);
  };

  const handleAvatarModalOk = async () => {
    if (fileList.length > 0 && fileList[0].originFileObj) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target && e.target.result) {
          const newAvatar = e.target.result as string; // Đây là data URL
          setEditedUser(prev => prev ? { ...prev, avatar: newAvatar } : null);
          
          // Lưu avatar lên Firebase Storage
          const storage = getStorage();
          const storageRef = ref(storage, `avatars/${auth.currentUser?.uid}`); // Tạo tham chiếu đến vị trí lưu trữ

          try {
            await uploadString(storageRef, newAvatar, 'data_url'); // Tải lên ảnh dưới dạng data URL
            const downloadURL = await getDownloadURL(storageRef); // Lấy URL tải xuống
            
            // Cập nhật avatar trên Firebase
            const user = auth.currentUser; // Lấy người dùng hiện tại
            if (user) {
              await updateProfile(user, {
                displayName: editedUser?.name, // Cập nhật displayName
                photoURL: downloadURL // Cập nhật photoURL với URL tải xuống
              });
            }
          } catch (error) {
            console.error("Lỗi khi tải lên ảnh:", error);
            toast.error("Lỗi khi tải lên ảnh. Vui lòng thử lại.");
          }
        }
      };
      reader.readAsDataURL(fileList[0].originFileObj);
    }
    setIsAvatarModalVisible(false);
    setFileList([]);
  };

  const handleAvatarModalCancel = () => {
    setIsAvatarModalVisible(false);
    setFileList([]);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Hình ảnh phải nhỏ hơn 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedUser(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleGenderChange = (gender: string) => {
    setEditedUser(prev => prev ? { ...prev, gender } : null);
  };

  const handleSave = async () => {
    if (editedUser) {
      // Cập nhật tên người dùng trên Firebase
      const user = auth.currentUser; // Lấy người dùng hiện tại
      if (user) {
        await updateProfile(user, {
          displayName: editedUser.name, // Cập nhật displayName
          photoURL: editedUser.avatar // Cập nhật photoURL
        });
      }

      // Lưu thông tin người dùng mới vào localStorage
      localStorage.setItem('currentUser', JSON.stringify(editedUser));
      setCurrentUser(editedUser); // Cập nhật currentUser
      toast.success('Thông tin đã được cập nhật thành công!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Không có thông tin để lưu!'); // Thông báo nếu không có thông tin
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 pb-2 border-b">Hồ sơ</h1>
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="w-full md:w-1/2 mb-6 md:mb-0 md:border-r md:pr-8">
            <h2 className="text-xl font-semibold mb-4">Thông tin</h2>
            <div className="flex flex-col md:flex-row items-start mb-4">
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <Avatar size={80} src={editedUser?.avatar} icon={<UserOutlined />} />
                <Button 
                  icon={<EditOutlined />} 
                  className="absolute bottom-0 right-0 rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={handleAvatarChange}
                />
              </div>
              <div className="flex-grow w-full md:w-auto">
                <p className="font-semibold mb-2">Tên</p>
                <Input 
                  value={editedUser?.name} 
                  onChange={(e) => handleInputChange('name', e.target.value)} 
                  className="mb-4 w-full h-10" 
                />
                <p className="font-semibold mb-2">Giới tính</p>
                <div className="flex gap-4 mb-4">
                  <Button 
                    className={`flex-1 rounded-full ${editedUser?.gender === 'Nữ' ? 'border-[#ffe279]' : ''}`}
                    onClick={() => handleGenderChange('Nữ')}
                  >
                    Nữ
                  </Button>
                  <Button 
                    className={`flex-1 rounded-full ${editedUser?.gender === 'Nam' ? 'border-[#ffe279]' : ''}`}
                    onClick={() => handleGenderChange('Nam')}
                  >
                    Nam
                  </Button>
                  <Button 
                    className={`flex-1 rounded-full ${editedUser?.gender === 'Khác' ? 'border-[#ffe279]' : ''}`}
                    onClick={() => handleGenderChange('Khác')}
                  >
                    Khác
                  </Button>
                </div>
                <p className="font-semibold mb-2">Ngày sinh</p>
                <div className="flex gap-4">
                  <Select 
                    suffixIcon={<DownOutlined />} 
                    className="flex-1 h-10"
                    value={editedUser?.birthDay}
                    onChange={(value) => handleInputChange('birthDay', value)}
                    placeholder="--"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <Option key={day} value={day.toString()}>{day}</Option>
                    ))}
                  </Select>
                  <Select 
                    suffixIcon={<DownOutlined />} 
                    className="flex-1 h-10"
                    value={editedUser?.birthMonth}
                    onChange={(value) => handleInputChange('birthMonth', value)}
                    placeholder="--"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <Option key={month} value={month.toString()}>{month}</Option>
                    ))}
                  </Select>
                  <Select 
                    suffixIcon={<DownOutlined />} 
                    className="flex-1 h-10"
                    value={editedUser?.birthYear}
                    onChange={(value) => handleInputChange('birthYear', value)}
                    placeholder="--"
                  >
                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                      <Option key={year} value={year.toString()}>{year}</Option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <h2 className="text-xl font-semibold mb-4">Số điện thoại và Email</h2>
            <p className="font-semibold mb-2">Điện thoại</p>
            <Input 
              value={editedUser?.phone} 
              onChange={(e) => handleInputChange('phone', e.target.value)} 
              className="mb-4 h-10" 
            />
            <p className="font-semibold mb-2">E-mail</p>
            <Input value={editedUser?.email} className="mb-4 h-10" readOnly disabled style={{ backgroundColor: 'rgba(0,0,0,0.05)' }} />
            <p className="font-semibold mb-2">Mật khẩu</p>
            <div className="flex items-center">
              <Input 
                value={editedUser?.password} 
                className="flex-grow mr-2 h-10" 
                readOnly 
                style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
              />
              <Button 
                icon={<EditOutlined />} 
                className="flex items-center h-10"
              >
                Thay đổi
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button type="primary" shape="round" onClick={handleSave} className="h-10">Lưu</Button>
      </div>

      <Modal
        title="Thay đổi ảnh đại diện"
        visible={isAvatarModalVisible}
        onOk={handleAvatarModalOk}
        onCancel={handleAvatarModalCancel}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          maxCount={1}
        >
          {fileList.length < 1 && '+ Tải ảnh lên'}
        </Upload>
      </Modal>
    </div>
  );
};

export default AccountInfoPage;