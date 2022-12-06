const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/takeQuote", postsController.takeQuote);

router.put("/createInfo/:id", postsController.createInfo);

router.post("/getQuote", postsController.getQuote);

router.delete("/deleteOrder/:id", postsController.deleteOrder);

module.exports = router;
