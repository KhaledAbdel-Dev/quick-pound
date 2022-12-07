const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

//Post Routes - simplified for now

router.post("/takeQuote", postsController.takeQuote);

router.put("/createInfo/:id", postsController.createInfo);

router.post("/getQuote", postsController.getQuote);

module.exports = router;
