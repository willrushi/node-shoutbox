const Post = require("../models/Post");

exports.newPost = (req, res) => {
    const { content, author } = req.body;
    
    if (content == null || author == null) {
        res.send({ "success": false });        
    }  

    try{
        Post.addPost(content, author)
            .then(res.send({ "success:": true }));
    } catch {
        res.send({ "success": false });
    }
}

exports.getPosts = (req, res) => {
    try{
        Post.getPosts()
        .then((response) => {
            res.send({ "success": true, data: response });
        });
    } catch {
        res.send( {"success": false });
    }
    
}

exports.updatePost = (req, res) => {
    const { id, content } = req.body;

    if (id == null || content == null){
        res.send({ "success": false });
    }

    try{
        Post.updatePost(id, content)
            .then((success) => {
                if(success){
                    res.send({ "success": true });
                } else {
                    res.send({ "success": false });
                }
            });
    } catch {
        console.log();
    }
}

exports.deletePost = (req, res) => {
    const { id } = req.body;

    if(id == null){
        res.send({ "success": false });
    }

    try{
        Post.deletePost(req.params.id)
        .then((postDeleted) => {
            res.send({ "success": postDeleted });
        });
    } catch {
        res.send({ "success": false })
    }
}