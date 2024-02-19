const Blog = require('../models/blog');

//creating functions

const blogIndex = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err)
        })
}

const blogPost = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err)
        })
}

const blogCreate = (req, res) => {
    res.render('create', { title: 'Create' });
}

const blogDetail = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'blogs Details' })
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Error' })
        })
}

const blogDelete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            console.log('Blog deleted successfully');
            res.json({ redirect: '/blogs', showAlert: true });
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    blogIndex, blogPost, blogDetail, blogCreate, blogDelete
}