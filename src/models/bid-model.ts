import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    bidAmount: {
      type: Number,
      required: true,
    },
    estimatedDays: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",
      required: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["bids"]) {
  delete mongoose.models["bids"];
}

const BidModel = mongoose.model("bids", bidSchema);

export default BidModel;
