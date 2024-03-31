import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    lastDateToPlaceBid: {
      type: String,
      required: true,
    },
    skillsRequired: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    attachments: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    bidsReceived: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["tasks"]) {
  delete mongoose.models["tasks"];
}

const TaskModel = mongoose.model("tasks", taskSchema);
export default TaskModel;
