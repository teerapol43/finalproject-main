const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types; // Add this line to import ObjectId

const editUserDetailSchema = mongoose.Schema(
  {
    editUserBy: {
      type: String,
    },
    editUser: {
      type: String,
    },
    editUserDetail: {
      type: String,
    },
    editedTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("editUserDetail", editUserDetailSchema);
