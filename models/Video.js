import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    desc: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    video: { type: String, default: "" },
    views: { type: Number, default: 0 },
    tags: { type: Array, default: [] },
    likes: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.models.Video || mongoose.model("Video", VideoSchema);
export default Video;
