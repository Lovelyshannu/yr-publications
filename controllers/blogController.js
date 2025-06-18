const Blog = require('../models/blog');
const BlogPost = require('../models/blogPost');

exports.listBlogs = async (req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 }); // fetch blog posts from DB
    res.render('blogs', {
      title: 'Blogs',
      active: 'blogs',
      posts, // ✅ pass posts to EJS
      user: req.session.user || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.listPosts = async (req, res) => {
  const posts = await BlogPost.find().sort({ createdAt: -1 });
  res.render('blogs', {
  posts,                
  active: 'blogs',      
  user: req.session.user || null });
};

exports.viewPost = async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug });
  if (!post) return res.redirect('/blog');
  res.render('blog-detail', { post });
};
