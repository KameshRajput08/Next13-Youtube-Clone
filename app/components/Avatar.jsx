"use client";
import Image from "next/image";

const Avatar = ({ src, height, width }) => {
  return (
    <Image
      height={height}
      width={width}
      className={`rounded-full h-[${height}px] w-[${width}px] object-cover`}
      alt="Avatar"
      src={src ? src : "/img/placeholder.jpg"}
    />
  );
};

export default Avatar;
