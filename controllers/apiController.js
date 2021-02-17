const Post = require("../models/Post");

exports.newPost = (req, res) => {
    Post.AddPost("test","Will");
    res.send("added post");
}

exports.updatePost = (req, res) => {
    res.send("TODO: update post");
}

exports.deletePost = (req, res) => {
    res.send("TODO: delete post");
}

exports.getPosts = (req, res) => {
    Post.GetPosts()
        .then((response) => {
            res.send(response);
        });
}