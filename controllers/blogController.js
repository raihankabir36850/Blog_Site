const { request } = require('express');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require("../models/User")

// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'all-Blogs', blogs: result, createdAt: new Date() });
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_details = (req, res) => {
    const id = req.params.id.trim();

    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { title: 'Details', blog: result })
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Blog Not Found' });
        });
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create-Blogs', blog: new Blog() });
}

const blog_create_post = async (req, res) => {
    const token = req.cookies.jwt
    const decrypt = await jwt.verify(token, 'net ninja secret')
    const user = await User.findById(decrypt.id).exec();
    const blog = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    });
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            res.render('blogs/create', { title: 'Create-Blogs', user: user, blog: blog })
        });
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => {
            console.log(err);
        })
}

const blog_edit = (req, res) => {
    res.send('hello bangladesh')
}

module.exports = {
    blog_index, blog_details, blog_create_get, blog_create_post, blog_delete, blog_edit
}