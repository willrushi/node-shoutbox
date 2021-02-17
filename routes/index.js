const express = require("express");
const router = express.Router();

// Add required routes to the router
router.get("/test", (req, res) => {
    res.send("test page");
});

module.exports = router;