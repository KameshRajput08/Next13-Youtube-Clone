import getVideos from "@/app/actions/getVideos";
import Card from "@/app/components/Card/Card";
import ClientOnly from "@/app/components/ClientOnly";
import LoadingCard from "@/app/components/LoadingCard";
import React from "react";

const page = async ({ params }) => {
  let body = (
    <>
      {["", "", "", "", "", "", "", ""].map((card, index) => (
        <LoadingCard key={index} />
      ))}
    </>
  );
  const videos = await getVideos({ type: "search", q: params.query });
  body = (
    <div className={"grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 "}>
      {videos?.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </div>
  );
  return (
    <div className={`p-0 sm:py-10 sm:px-6`}>
      <ClientOnly>
        <h1 className={`text-[20px] pb-5 font-medium`}>
          Results for <span  className="text-[25px] font-semibold">&quot;{params.query}&quot;</span>
        </h1>
        {body}
      </ClientOnly>
    </div>
  );
};

export default page;
