import connectMongo from "../libs/conn";
import Video from "@/models/Video";
import { getCurrentUser } from "./getCurrentUser";

export default async function getVideos(params) {
  const conn = await connectMongo();
  if (conn) {
    let videos = await Video.aggregate([{ $sample: { size: 20 } }]);

    if (params?.type) {
      switch (params.type) {
        case "latest":
          videos = await Video.find().lean().sort({ createdAt: -1 });
        case "trending":
          videos = await Video.find().lean().sort({ views: -1 });
          break;
        case "user":
          videos = await Video.find({ user: params.id })
            .lean()
            .sort({ createdAt: -1 });
          break;
        case "search":
          videos = await Video.find({ title: new RegExp(params.q, "i") })
            .lean()
            .sort({ createdAt: -1 });
          break;
        case "suscriptions":
          const user = await getCurrentUser();
          videos = await Video.find({ user: { $in: user.suscribedChannels } }).lean();
          break;
        default:
          break;
      }
    }

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

export async function getVideoById(id) {
  const conn = await connectMongo();
  if (conn) {
    const video = await Video.findById(id).lean();
    const safeVideo = {
      ...video,
      _id: video._id.toString(),
      user: video.user.toString(),
      createdAt: video.createdAt.toISOString(),
    };
    return safeVideo;
  }
}
