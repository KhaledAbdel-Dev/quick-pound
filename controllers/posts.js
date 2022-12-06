const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {

      res.render("profile.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getFeed: async (req, res) => {
    try {
      const pickup = await Post.find().sort({ createdAt: "desc" }).lean();

      res.render("feed.ejs", { cxLocation: pickup });
    } catch (err) {
      console.log(err);
    }
  },


  getQuote: async (req, res) => {
    try {
      const finalOffer = await Post.find({ quoteStatus: 'approved' });
      console.log(finalOffer)
      res.render("quote.ejs", { quote: finalOffer, user: req.user });
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
    const milageValue = Math.round((Number(req.body.milage) - 50000) / 5000) * 50
    let quotePrice = (Number(req.body.make) * Number(req.body.year) * Number(req.body.cats)) + Number(req.body.body) + Number(req.body.drive) - milageValue
    try {
      await Post.create({
        year: Number(req.body.year),
        make: Number(req.body.make),
        cats: Number(req.body.cats),
        body: Number(req.body.body),
        drive: Number(req.body.drive),
        mileage: Number(req.body.milage),
        zip: Number(req.body.zip),
        quoteValue: quotePrice
      });
      console.log("Quote has been added!");
      res.redirect("/quote");
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
      res.redirect("/feed");
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
