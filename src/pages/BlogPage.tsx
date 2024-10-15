import React, { useState, useEffect } from 'react';
import { Input, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, CalendarOutlined, TagOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';

interface BlogPost {
  id: string;
  image: string;
  title: string;
  content: string;
  author: string;
  day: string;
  tag: string;
  category: string;
}

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [displayedBlogs, setDisplayedBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: number }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  useEffect(() => {
    fetch('/ecommerce-blogs.json')
      .then(response => response.json())
      .then(data => {
        setBlogs(data.blogs);
        updateDisplayedBlogs(data.blogs, 1);
        updateCategories(data.blogs);
      });
  }, []);

  const updateDisplayedBlogs = (allBlogs: BlogPost[], page: number) => {
    const startIndex = (page - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    setDisplayedBlogs(allBlogs.slice(startIndex, endIndex));
  };

  const updateCategories = (allBlogs: BlogPost[]) => {
    const cats: { [key: string]: number } = {};
    allBlogs.forEach(blog => {
      cats[blog.category] = (cats[blog.category] || 0) + 1;
    });
    setCategories(cats);
  };

  const handleSearch = (value: string) => {
    const filteredBlogs = blogs.filter(blog => 
      blog.title.toLowerCase().includes(value.toLowerCase()) ||
      blog.content.toLowerCase().includes(value.toLowerCase())
    );
    updateDisplayedBlogs(filteredBlogs, 1);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateDisplayedBlogs(blogs, page);
  };

  return (
    <div>
      <Header />
      <PageBanner title="Blog" backgroundImage="/images/blog-banner.jpg" />
      <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="w-full lg:w-2/3">
            {displayedBlogs.map(blog => (
              <div key={blog.id} className="mb-8 bg-white lg:shadow-none lg:rounded-none shadow-md rounded-lg overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-48 sm:h-64 object-fill" />
                <div className="p-4">
                  <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <UserOutlined className="mr-1" /> {blog.author}
                    </span>
                    <span className="flex items-center">
                      <CalendarOutlined className="mr-1" /> {blog.day}
                    </span>
                    <span className="flex items-center">
                      <TagOutlined className="mr-1" /> {blog.tag}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-medium mb-2">{blog.title}</h2>
                  <p className="mb-4 text-gray-600 lg:line-clamp-none line-clamp-3">{blog.content}</p>
                  <Link to={`/blog/${blog.id}`} className="text-blue-600 hover:text-blue-800 font-medium">Read more</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
            <div className="mb-8 bg-white lg:shadow-none lg:rounded-none shadow-md rounded-lg p-4">
              <div className="hidden lg:block">
                <Input.Search
                  placeholder="Search blogs"
                  onSearch={handleSearch}
                  className="mb-4"
                />
              </div>
              <h2 className="text-xl font-medium mb-4">Categories</h2>
              {Object.entries(categories).map(([category, count]) => (
                <div key={category} className="flex justify-between items-center py-2  last:border-b-0">
                  <span className="capitalize">{category}</span>
                  <span className=" px-2 py-1 text-xs">{count}</span>
                </div>
              ))}
            </div>
            <div className="bg-white lg:shadow-none lg:rounded-none shadow-md rounded-lg p-4">
              <h2 className="text-xl font-medium mb-4">Recent Posts</h2>
              {blogs.slice(0, 5).map(blog => (
                <div key={blog.id} className="flex mb-4 last:mb-0">
                  <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded mr-4" />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1 lg:line-clamp-none line-clamp-2">{blog.title}</h3>
                    <p className="text-xs text-gray-500">{blog.day}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}
            total={blogs.length}
            pageSize={blogsPerPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;