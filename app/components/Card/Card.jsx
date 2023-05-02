"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { format } from "timeago.js";
import Image from "next/image";
import { useTheme } from "next-themes";
import axios from "axios";
import LoadingCard from "../LoadingCard";

const Card = ({ video }) => {
  const { theme } = useTheme();
  const [channel, setChannel] = useState();

  useEffect(() => {
    async function fetchUser() {
      const res = await axios.get(`/api/users/${video.user}`);
      setChannel(res.data);
    }
    fetchUser();
  }, [video.user]);

  return (
    <Suspense fallback={<LoadingCard />}>
      <div className="mb-6 w-full h-full cursor-pointer flex flex-col gap-1 relative">
        <Link href={`/video/${video?._id}`}>
          <Image
            width={300}
            height={150}
            className="w-full h-[160px] rounded-lg object-cover"
            src={video?.thumbnail}
            alt="thumbnail"
          />
        </Link>
        <div className={`flex mt-2 gap-4`}>
          <Link href={`/profile/${channel?._id}`}>
            <Image
              width={36}
              height={36}
              className={`rounded-full w-9 h-9 object-cover`}
              src={channel?.image || "/img/placeholder.jpg"}
              alt="profile image"
            />
          </Link>
          <div className={``}>
            <h1 className={` font-medium text-[16px] text-${theme}-text`}>
              {video?.title}
            </h1>
            <span className={`font-medium text-[14px] text-[#aaaaaa]`}>
              {channel?.username}
            </span>
            <div className={`text-[13px] font-medium text-[#aaaaaa]`}>
              {video?.views} views • {format(video?.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Card;
