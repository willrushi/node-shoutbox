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

module.exports.AddPost = (content, author) => {
    PostModel.create({ content: content, author: author }, (err, result) => {
        if (err){
            
        }
        console.log(`Added new post by ${author} at ${Date.now()}.`);
        return;
    });
}
/*
module.exports.GetPosts = async () => {
    await PostModel.find({}, (err, result) => {
        if(err){
            throw err;
        }
        console.log("fetching posts");
        return result;
    });
}
*/
module.exports.GetPosts = async () => {
    const result = await PostModel.find({});
    return result;
}

module.exports.UpdatePost = (id, content) => {
    PostModel.updateOne({ _id: id }, { content: content }, (err, docs) => {
        if(err){
            throw err;
        }else{
            return docs;
        }
    });
    return;
}

module.exports.DeletePost = (id) => {
    PostModel.deleteOne({ _id: id }, (err) => {
        if(err){
            throw err;
        }else{
            return;
        }
    });
}