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
      const finalOffer = await Post.find({ quoteStatus: 'approved' });
      const acceptedOffer = await Post.db.collection("comments").find
      console.log(finalOffer)
      res.render("feed.ejs", { quote: finalOffer, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },


  getQuote: async (req, res) => {
    try {
      const finalOffer = await Post.find({ quoteStatus: 'approved' });

      res.render("quote.ejs", { quote: finalOffer, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },


  takeQuote: async (req, res) => {
    console.log(req.body)
    const milageValue = Math.round((Number(req.body.milage) - 50000) / 5000) * 50
    let quotePrice = (Number(req.body.make) * Number(req.body.year) * Number(req.body.cats)) + (Number(req.body.body) * 50) + Number(req.body.drive) - milageValue
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
      await Post.db.collection("acceptQuote").insertOne(
       {
          pickup: req.body.pickup,
          phoneNumber: req.body.number,
          name: req.body.name
        }
      );
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  }

  // createInfo: async (req, res) => {
  //   console.log(req.body)
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //      {
  //         pickup: req.user.pickup,
  //         phoneNumber: req.body.number,
  //         name: req.body.name
  //       }
  //     );
  //     res.redirect("/feed");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
