"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { MdDelete, MdMoreVert } from "react-icons/md";
import Link from "next/link";
import Icon from "../Icon";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const Comment = ({ comment }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  const [show, setshow] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${comment.user}`);
      setUser(res.data);
    };
    fetchUser();
  }, [comment.user]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/comments/${comment._id}`);
      router.refresh();
    } catch (err) {
      console.log(err);
    }

    setshow(false);
  };

  return (
    <div className={`flex items-center justify-between gap-3 my-7 relative`}>
      <div className="flex items-center gap-3">
        <Link href={`/profile/${session?.user?._id}`}>
          <Image
            width={35}
            height={35}
            className="w-9 h-9 rounded-full cursor-pointer object-cover"
            src={user?.image ? user.image : "/img/placeholder.jpg"}
            alt="profile picture"
          />
        </Link>

        <div
          className={` flex justify-center gap-1 flex-col text-${theme}-text`}
        >
          <div className={`flex items-center gap-2`}>
            <span className={` font-medium text-xs`}> {user.username}</span>
            <span className="dot"></span>
            <span className={`text-[10px] ${clsx(`text-${theme}-textSoft`)}`}>
              {format(new Date(comment.createdAt))}
            </span>
          </div>

          <span className=" text-[14px]">{comment.desc}</span>
        </div>
      </div>
      {comment.user === session?.user._id && (
        <Icon IconType={MdMoreVert} size={20} onClick={() => setshow(!show)} />
      )}
      {show && (
        <div
          className={`absolute top-[30px] right-2 z-50 transition duration-200 ease-in-out`}
        >
          <div
            className={`flex items-start gap-3 cursor-pointer px-3 py-1 w-full ${clsx(
              `bg-${theme}-BgSoft text-${theme}-text`
            )}`}
            onClick={() => handleDelete(comment._id)}
          >
            <Icon IconType={MdDelete} size={20} />
            Delete Comment
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
