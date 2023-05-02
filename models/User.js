import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    desc: { type: String, default: '' },
    suscribers: { type: Number, default: 0 },
    suscribedChannels: { type: Array },
    image: { type: String, default: "" },
    coverImg: { type: String, default: "" },
    google: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
