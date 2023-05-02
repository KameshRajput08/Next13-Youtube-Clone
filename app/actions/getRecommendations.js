import Video from "@/models/Video";
import connectMongo from "../libs/conn";

export default async function getRecommendations(tags) {
  const conn = await connectMongo();
  if (conn) {
    const videos = await Video.aggregate([
      { $match: { tags: { $in: tags.map((tag) => new RegExp(tag, "i")) } } },
    ]);

    const safeVideos = videos?.map((video) => ({
      ...video,
      _id: video._id.toString(),
      user: video.user.toString(),
      createdAt: video.createdAt.toISOString(),
    }));

    return safeVideos;
  } else {
    return null;
  }
}
