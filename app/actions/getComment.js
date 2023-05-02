import Comment from "@/models/Comment";
import connectMongo from "../libs/conn";

export default async function getComments(id) {
  const conn = await connectMongo();
  if (conn) {
    const comments = await Comment.find({ video: id })
      .sort({ createdAt: -1 })
      .lean();

    const safeComments = comments?.map((comment) => ({
      ...comment,
      video: comment.video.toString(),
      _id: comment._id.toString(),
      user: comment.user.toString(),
      createdAt: comment.createdAt.toISOString(),
    }));

    return safeComments;
  } else {
    return null;
  }
}
