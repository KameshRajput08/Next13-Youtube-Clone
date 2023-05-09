import { getVideoById } from "@/app/actions/getVideos";
import ClientOnly from "@/app/components/ClientOnly";
import User from "@/models/User";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import Video from "./Video";
import Recommendations from "@/app/components/Recommendations";
import getRecommendations from "@/app/actions/getRecommendations";
import Comments from "@/app/components/Comment/Comments";
import { Suspense } from "react";

const VideoPage = async ({ params }) => {
  const video = await getVideoById(params.id);
  const channel = await User.findById(video.user);
  const user = {
    _id: channel._id.toString(),
    image: channel.image,
    username: channel.username,
    suscribers: channel.suscribers,
  };

  const recommendations = await getRecommendations(video.tags);

  const currentUser = await getCurrentUser();
  return (
    <div className={`flex flex-col md:flex-row gap-6 p-0 sm:px-7 sm:py-5`}>
      <div className={`flex-[4]`}>
        <ClientOnly page="video">
          <Video video={video} channel={user} currentUser={currentUser} />

          <Suspense fallback={<></>}>
            <Comments id={params.id} currentUser={currentUser} />
          </Suspense>
        </ClientOnly>
      </div>
      <Recommendations rec={recommendations} />
    </div>
  );
};

export default VideoPage;
