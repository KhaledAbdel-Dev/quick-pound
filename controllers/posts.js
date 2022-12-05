const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const finalOffer = await Post.find({ cats: '.6' });
      const finalOffers = await Post.find({ cats: '.25' });

      res.render("profile.ejs", { quoteY: finalOffer, quoteN: finalOffers, user: req.user });
      console.log('Saul Goodman')
    } catch (err) {
      console.log(err);
    }
  },

  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  takeQuote: async (req, res) => {
    console.log(req.body)
    try {
      await Post.create({
        year: req.body.year,
        make: req.body.make,
        cats: req.body.cats,
        body: req.body.body,
        drive: req.body.drive,
        mileage: req.body.milage,
        zip: req.body.zip
      });
      console.log("Quote has been added!");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
  createInfo: async (req, res) => {
    console.log(req.body)
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
       {
          pickup: req.user.pickup
        }
      );
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },


  deleteOrder: async (req, res) => {
    try {
      await Post.remove({ _id: req.params.id });
      console.log("Deleted order!");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
