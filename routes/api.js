const express = require("express");
const router = express.Router();

/* Import the API controller */
const apiController = require("../controllers/apiController");

/* Add required routes to the router */

// Add a new post
router.post("/new", apiController.newPost);

// Update a post by its ID
router.post("/update", apiController.updatePost);

// Delete a post by its ID
router.post("/delete/:id", apiController.deletePost);

// Get all posts
router.get("/get", apiController.getPosts);

module.exports = router;