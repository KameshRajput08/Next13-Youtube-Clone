"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { format } from "timeago.js";

import Image from "next/image";
import Icon from "@/app/components/Icon";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { MdDelete, MdOutlineLibraryAdd } from "react-icons/md";
import Hr from "@/app/components/Hr";
import { useTheme } from "next-themes";
import Link from "next/link";
import useLoginModal from "@/app/components/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const Video = ({ video, channel, currentUser }) => {
  const router = useRouter();
  const { onOpen } = useLoginModal();
  const { theme } = useTheme();
  const [likes, setLikes] = useState(video?.likes.length);
  const [isLiked, setIsLiked] = useState(
    video?.likes.includes(currentUser?._id)
  );
  const [isSuscribed, setIsSuscribed] = useState(
    currentUser?.suscribedChannels.includes(channel._id)
  );
  const [suscribers, setSuscribers] = useState(channel.suscribers);

  useEffect(() => {
    const addView = async () => {
      await axios.put(`/api/videos/${video?._id}`);
    };
    addView();
  }, [video?._id]);

  const handleLike = async () => {
    if (currentUser) {
      try {
        const res = await axios.put(`/api/videos/${video?._id}/like`);
        setLikes(res?.data?.isliked ? likes + 1 : likes - 1);
        setIsLiked(res?.data?.isliked);
      } catch (err) {
        console.log(err);
      }
    } else {
      onOpen();
    }
  };

  const handleSuscription = async () => {
    if (currentUser) {
      try {
        const res = await axios.put(`/api/users/${channel?._id}/suscribe`);
        setIsSuscribed(res?.data?.isSuscribed);
        setSuscribers(res?.data?.isSuscribed ? suscribers + 1 : suscribers - 1);
      } catch (err) {
        console.log(err);
      }
    } else {
      onOpen();
    }
  };

  const handleDelete = async () => {
    if (currentUser?._id === video.user) {
      try {
        const res = await axios.delete(`/api/videos/${video._id}`);
        console.log(res);
        router.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div>
        <video
          className={`max-h-[500px] w-full object-cover `}
          src={video?.video}
          controls
        />
      </div>
      <h1 className={`text-xl font-normal mt-5 mb-2 text-${theme}-text px-3`}>
        {video?.title}
      </h1>
      <div
        className={`flex gap-4 sm:gap-0 flex-col sm:flex-row justify-between px-3`}
      >
        <span className={`text-${theme}-textSoft text-sm`}>
          {video?.views} views • {format(video?.createdAt)}
        </span>
        <div className={`flex text-${theme}-text gap-5`}>
          <div className={`flex gap-1 items-center cursor-pointer`}>
            {isLiked ? (
              <Icon IconType={AiFillLike} size={22} onClick={handleLike} />
            ) : (
              <Icon IconType={AiOutlineLike} size={22} onClick={handleLike} />
            )}
            {likes}
          </div>
          <div className={`flex gap-1 items-center cursor-pointer`}>
            <Icon IconType={IoIosShareAlt} size={22} /> Share
          </div>
          <div className={`flex gap-1 items-center cursor-pointer`}>
            <Icon IconType={MdOutlineLibraryAdd} size={22} /> Save
          </div>
          {video.user === currentUser?._id && (
            <div
              onClick={handleDelete}
              className={`flex gap-1 items-center cursor-pointer whitespace-nowrap`}
            >
              <Icon IconType={MdDelete} size={22} /> Delete Video
            </div>
          )}
        </div>
      </div>
      <Hr />
      <div className={`flex justify-between px-4 sm:px-0 mb-6`}>
        <div className="flex items-center justify-center gap-3">
          <Link href={`/profile/${channel._id}`}>
            <Image
              width={45}
              height={45}
              src={channel?.image ? channel.image : "/img/placeholder.jpg"}
              className=" w-11 h-11 rounded-full object-cover cursor-pointer"
              alt=""
            />
          </Link>
          <div className={`flex flex-col text-${theme}-text`}>
            <span className="font-medium">{channel?.username}</span>
            <span
              className={`font-normal text-[12px] text-${theme}-textSoft mt-[2px]`}
            >
              {suscribers} suscribers
            </span>
          </div>
        </div>
        <button
          className={`bg-red-700 font-medium text-white border-none rounded-md px-5 py-1 cursor-pointer`}
          onClick={handleSuscription}
        >
          {isSuscribed ? "SUBSCRIBEB" : "SUBSCRIBE"}
        </button>
      </div>
      <p className={`text-${theme}-text text-[14px] px-4 md:px-0`}>
        {video?.desc}
      </p>
      <Hr />
    </>
  );
};

export default Video;
