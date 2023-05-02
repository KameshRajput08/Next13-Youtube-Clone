"use client";

import axios from "axios";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const Comment = ({ currentUser, id }) => {
  const [loading, setLoading] = useState(false);
  const descRef = useRef();
  const { theme } = useTheme();
  const router = useRouter();

  const handleComment = async (e) => {
    if (descRef?.current?.value) {
      setLoading(true);

      try {
        await axios.post(`/api/comments/${id}`, {
          desc: descRef.current.value,
        });
        router.refresh();
        descRef.current.value = "";
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }
  };
  return (
    <div className={`flex items-center gap-2 px-2 sm:px-0`}>
      <Image
        width={40}
        height={40}
        className=" rounded-full"
        src={currentUser?.image ? currentUser.image : "/img/placeholder.jpg"}
        alt="profile picture"
      />
      <input
        ref={descRef}
        className={` border-none border-b-2 border-b-${theme}-border bg-transparent outline-none p-1 w-full `}
        placeholder="Add a comment..."
      />
      <button
        onClick={handleComment}
        className={`w-[160px] block bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-3 py-1.5`}
        disabled={loading}
      >
        {loading ? (
          <ClipLoader color={"#fff"} size={20} className="loader" />
        ) : (
          "COMMENT"
        )}
      </button>
    </div>
  );
};

export default Comment;
