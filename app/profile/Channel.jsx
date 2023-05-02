"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../components/Inputs/Button";
import useCustomizeModal from "../components/hooks/getCustomizeModal";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import axios from "axios";
import Card from "../components/Card/Card";

const Channel = ({ user, currentUser, videos }) => {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const [suscribers, setSuscribers] = useState(user?.suscribers);
  const { onOpen } = useCustomizeModal();
  const [isSuscribed, setisSuscribed] = useState(
    currentUser?.suscribedChannels.includes(user?._id)
  );
  const [active, setActive] = useState("home");

  let body = <></>;

  if (active === "videos") {
    body = (
      <div
        className={`w-full p-8 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 `}
      >
        {videos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </div>
    );
  }

  const handleSuscription = async () => {
    try {
      const res = await axios.put(`/api/users/${user?._id}/suscribe`);
      setisSuscribed(res?.data?.isSuscribed);
      setSuscribers(res?.data?.isSuscribed ? suscribers + 1 : suscribers - 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Image
        width={500}
        height={200}
        src={
          user?.coverImg
            ? user.coverImg
            : "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        }
        className={`w-full max-h-[200px] object-cover`}
        alt="cover image"
      />
      <div
        className={`flex items-center flex-col md:flex-row justify-between  min-h-[180px] px-10 py-10`}
      >
        <div className={`flex items-center flex-col md:flex-row gap-4 h-full`}>
          <Image
            src={user?.image ? user.image : "/img/placeholder.jpg"}
            width={200}
            height={200}
            className={` w-32 h-32 rounded-full`}
            alt="Profile Image"
          />
          <div
            className={`flex flex-col items-center md:items-start mb-5 md:mb-0`}
          >
            <h1 className={`text-[30px] font-[600]`}>{user.username}</h1>
            <h1 className={`text-[18px] font-[500] text-${theme}-textSoft`}>
              {user.desc}
            </h1>
            <h6 className={`text-sm text-${theme}-textSoft`}>
              <span className="text-lg">{suscribers}&nbsp;</span>Suscribers
            </h6>
          </div>
        </div>
        {user._id === session?.user?._id ? (
          <div className={`flex items-center gap-3 whitespace-nowrap`}>
            <Button
              text="Customize Channel"
              type="button"
              size={"sm"}
              onClick={() => onOpen()}
            />
            <Button
              text="Manage Videos"
              type="button"
              size={"sm"}
              onClick={() => setActive("videos")}
            />
          </div>
        ) : (
          <button
            className={`bg-red-700 font-medium text-white border-none rounded-md px-5 py-1 cursor-pointer`}
            onClick={handleSuscription}
          >
            {isSuscribed ? "SUBSCRIBEB" : "SUBSCRIBE"}
          </button>
        )}
      </div>
      <div>
        <div className={`flex items-center justify-between`}>
          <div
            onClick={() => setActive("home")}
            className={`flex uppercase cursor-pointer items-center justify-center h-11 w-full  ${
              active === "home" && `border-b-2 border-${theme}-border`
            }`}
          >
            HOME
          </div>
          <div
            onClick={() => setActive("videos")}
            className={`flex uppercase cursor-pointer items-center justify-center h-11 w-full  ${
              active === "videos" && `border-b-2 border-${theme}-border`
            }`}
          >
            VIDEOS
          </div>
          <div
            onClick={() => setActive("channels")}
            className={`flex uppercase cursor-pointer items-center justify-center h-11 w-full  ${
              active === "channels" && `border-b-2 border-${theme}-border`
            }`}
          >
            Channels
          </div>
        </div>
        {body}
      </div>
    </>
  );
};

export default Channel;
