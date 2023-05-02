import { getCurrentUser, getUserById } from "@/app/actions/getCurrentUser";
import React from "react";
import Channel from "../Channel";
import ClientOnly from "@/app/components/ClientOnly";
import getVideos from "@/app/actions/getVideos";

const page = async ({ params }) => {
  const user = await getUserById(params.id);
  const currentUser = await getCurrentUser();
  const videos = await getVideos({ type: "user", id: params.id });
  return (
    <div className={`flex flex-col pl-0 md:pl-5 pt-2`}>
      <ClientOnly>
        <Channel user={user} currentUser={currentUser} videos={videos} />
      </ClientOnly>
    </div>
  );
};

export default page;
