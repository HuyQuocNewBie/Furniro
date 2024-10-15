import React from 'react';
import { Row, Col, Card } from 'antd';

const categories = [
  { name: 'Phòng khách', image: '/images/living-room.jpg' },
  { name: 'Phòng ngủ', image: '/images/bedroom.jpg' },
  { name: 'Nhà bếp', image: '/images/kitchen.jpg' },
];

const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Danh mục nổi bật</h2>
        <Row gutter={[16, 16]}>
          {categories.map((category, index) => (
            <Col key={index} xs={24} sm={8} md={8} lg={8}>
              <Card
                hoverable
                cover={<img alt={category.name} src={category.image} className="h-48 object-cover" />}
              >
                <Card.Meta title={category.name} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default FeaturedCategories;