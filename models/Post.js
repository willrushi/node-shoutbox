const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define a schema for a post
const PostSchema = new Schema({
    content: {
        type: String,
        index: true
    },
    author: {
        type: String,
        default: "Anonymous"
    },
    time: {
        type: Date,
        default: Date.now()
    }
});

// Make a model from the schema and set it as the module export
const PostModel = module.exports = mongoose.model("PostModel", PostSchema);

module.exports.addPost = async (content, author) => {
    try{
        const result = await PostModel.create({ content: content, author: author });
        return true;
    }
    catch{
        return false;
    }
}

module.exports.getPosts = async () => {
    try{
        const result = await PostModel.find({});
        return result;
    }
    catch{
        return false;
    }
}

module.exports.updatePost = async (id, content) => {
    try{
        const result = await PostModel.updateOne({ _id: id }, { content: content });
        console.log(result);
        return result.nModified > 0;
    }
    catch(e){
        return false;
    }
    
}

module.exports.deletePost = async (id) => {
    try{
        const result = await PostModel.deleteOne({ _id: id });
        return result.deletedCount > 0;
    } 
    catch{
        return false;
    }
}