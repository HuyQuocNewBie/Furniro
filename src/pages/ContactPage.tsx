import React from 'react';
import Header from '../components/Header';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';
import { EnvironmentOutlined, PhoneOutlined, ClockCircleOutlined } from '@ant-design/icons';

const ContactPage: React.FC = () => {
  return (
    <div>
      <Header />
      <PageBanner title="Liên hệ" backgroundImage="/images/banner.svg" />
      <div className="container mx-auto px-4 py-8 mt-8 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Get In Touch With Us</h1>
            <p className="text-base md:text-lg">
              For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8 text-left">
              <div className="flex items-start">
                <EnvironmentOutlined className="text-xl mr-2 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Address</h2>
                  <p className="text-base md:text-lg">236 5th SE Avenue, New York NY10000, United States</p>
                </div>
              </div>
              <div className="flex items-start">
                <PhoneOutlined className="text-xl mr-2 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Phone</h2>
                  <p className="text-base md:text-lg">Mobile: +(84) 546-6789</p>
                  <p className="text-base md:text-lg">Hotline: +(84) 456-6789</p>
                </div>
              </div>
              <div className="flex items-start">
                <ClockCircleOutlined className="text-xl mr-2 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Working Time</h2>
                  <p className="text-base md:text-lg">Monday-Friday: 9:00 - 22:00</p>
                  <p className="text-base md:text-lg">Saturday-Sunday: 9:00 - 21:00</p>
                </div>
              </div>
            </div>
            <div>
              <form className="grid grid-cols-1 gap-4 text-left">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" htmlFor="name">Your Name</label>
                  <input type="text" id="name" placeholder='Abc' className="w-full border border-[#9F9F9F] text-[16px] font-normal rounded-md focus:outline-none focus:ring-2 focus:ring-primary px-5 py-5" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" htmlFor="email">Email Address</label>
                  <input type="email" id="email" placeholder='Abc@def.com' className="w-full border border-[#9F9F9F] text-[16px] font-normal rounded-md focus:outline-none focus:ring-2 focus:ring-primary px-5 py-5" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" htmlFor="subject">Subject</label>
                  <input type="text" id="subject" placeholder='This is an optional' className="w-full border border-[#9F9F9F] text-[16px] font-normal rounded-md focus:outline-none focus:ring-2 focus:ring-primary px-5 py-5" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" htmlFor="message">Message</label>
                  <textarea id="message" placeholder='Hi! i`d like to ask about' className="w-full border border-[#9F9F9F] text-[16px] font-normal rounded-md focus:outline-none focus:ring-2 focus:ring-primary px-5 py-5" rows={3}></textarea>
                </div>
                <div>
                  <button type="submit" className="bg-[#B88E2F] border-[1px] max-w-[237px] w-full h-[55px] text-[#ffffff] text-[16px] font-normal px-4 py-2 rounded-md">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;