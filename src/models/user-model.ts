import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      required: false,
      default: [],
    },
    bio: {
      type: String,
      required: false,
      default: "",
    },
    portfolio: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["users"]) {
  delete mongoose.models["users"];
}

const UserModel = mongoose.model("users", userSchema);
export default UserModel;
