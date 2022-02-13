const mongoose = require("mongoose");
const CarSchema = mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  descreption: String,
  price: String,
  SelectedFile: {
    type: String,
    default:
      "https://www.auto-moto.com/wp-content/uploads/sites/9/2021/02/01-peugeot-208-750x410.jpeg",
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  addedId: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});
module.exports = mongoose.model("Car", CarSchema);
