import React from 'react';
import Header from '../components/Header';
import PageBanner from '../components/PageBanner';

const AboutPage: React.FC = () => {
  return (
    <div>
      <Header />
      <PageBanner title="Về chúng tôi" backgroundImage="/images/about-banner.jpg" />
      <div className="container mx-auto px-4 py-8">
        {/* Nội dung trang Về chúng tôi */}
      </div>
    </div>
  );
};

export default AboutPage;