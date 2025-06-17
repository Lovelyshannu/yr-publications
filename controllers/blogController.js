const Blog = require('../models/blog');

exports.listBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.render('blogs', {
    title: 'Latest Blog Posts',
    blogs
  });
};
