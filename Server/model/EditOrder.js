const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose; // Importing Schema and ObjectId from Mongoose

const editOrderDetailSchema = Schema(
  {
    editOrderById: {
        type: String,
  
  },
    editOrderId: {
      type: String,
      ref: "order",
    },
    editOrderDetail: {
      type: String,
    },
    editedTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("editorderDetail", editOrderDetailSchema);
