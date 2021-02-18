const Post = require("../models/Post");

/**
 * Adds a new post to the database.
 * 
 * @param {string} req.content - The post content to be inserted
 * @param {string} req.author - The author of the post
 */
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


/**
 * Retrieves all posts from the database and sends them as json.
 */
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


/**
 * Updates a post in the database.
 * 
 * @param {string} req.id - The ID of the post to be updated
 * @param {string} req.content - The content to update the post with
 */
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


/**
 * Deletes a post from the database.
 * 
 * @param {string} req.id - The post ID to be deleted
 */
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