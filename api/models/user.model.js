import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    healthRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HealthRecord",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: "https://avatar.iran.liara.run/public",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
