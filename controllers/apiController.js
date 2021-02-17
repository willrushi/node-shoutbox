const Post = require("../models/Post");

exports.newPost = (req, res) => {
    const { content, author } = req.body;
    
    // Check if content and author exist
    if (content == null || author == null) {
        res.send({ "success": false });
        return;
    }  

    try{
        Post.addPost(content, author)
            .then(res.send({ "success:": true }));
    } catch {
        res.send({ "success": false });
    }

    return;
}

exports.getPosts = (req, res) => {
    try{
        Post.getPosts()
        .then((response) => {
            res.send({ "success": true, data: response });
        });
    } catch {
        res.send( { "success": false });
    }
    
    return;    
}

exports.updatePost = (req, res) => {
    const { id, content } = req.body;

    // Check if id and content exist
    if (id == null || content == null){
        res.send({ "success": false });
        return;
    }

    try{
        Post.updatePost(id, content)
            .then((success) => {
                if(success){
                    res.send({ "success": true });
                    return;
                } else {
                    res.send({ "success": false });
                }
            });
    } catch {
        res.send({ "success": false });
    }

    return;
}

exports.deletePost = (req, res) => {
    const { id } = req.params;

    // Check if id exists
    if(id == null){
        res.send({ "success": false });
        return;
    }

    try{
        Post.deletePost(id)
        .then((postDeleted) => {
            res.send({ "success": postDeleted });
        });
    } catch {
        res.send({ "success": false });
    }

    return;
}