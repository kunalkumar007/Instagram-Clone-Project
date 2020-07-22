const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types; //id of the users...

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "no pics",
  },
  likes: [
    {
      type: ObjectId,
      ref: "users",
    },
  ],
  comments: [
    {
      text: String,
      postedby: {
        type: ObjectId,
        ref: "users",
      },
    },
  ],
  postedby: {
    type: ObjectId, //id of the users
    ref: "users", //schema name we are relating it to ...
  },
});

module.exports = mongoose.model("post", postSchema);
