const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("./post.schema");
const verify = require("./token.jwt");

router.get("/all-post", verify, (req, res) => {
  Post.find()
    .populate("postedby", "_id name") //shows additional info with postedby ...
    .populate("comments.postedby", "_id name")
    .then((posts) => res.json({ post: posts }))
    .catch((err) => res.status(400).json(err));
});

router.post("/create-post", verify, (req, res) => {
  const { title, body, url } = req.body;
  if (!title || !body) return res.status(422).json("Enter all fields.");

  // console.log(req.user);
  // res.send("ok");
  const post = new Post({
    title,
    body,
    photo: url,
    postedby: req.user,
  });
  post
    .save()
    .then((result) => res.json({ post: result }))
    .catch((err) => res.status(400).json("post not saved"));
});

router.get("/my-post", verify, (req, res) => {
  Post.find({ postedby: req.user._id })
    .populate("postedby", "_id name")
    .then((data) => res.json({ myPosts: data }))
    .catch((err) => res.status(400).json({ err }));
});

router.put("/like", verify, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/unlike", verify, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/comment", verify, (req, res) => {
  const comment = {
    text: req.body.text,
    postedby: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate("comments.postedby", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.delete("/delete-post/:postId", verify, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedby._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json({ message: "Successfully deleted!" });
          })
          .catch((err) => console.log(err));
      }
    });
});

module.exports = router;
