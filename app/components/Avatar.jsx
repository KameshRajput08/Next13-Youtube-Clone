'use client';
import Image from "next/image";

const Avatar = ({ src, height, width }) => {
  return (
    <Image
      className="rounded-full"
      height={height}
      width={width}
      alt="Avatar"
      src={src ? src : "/img/placeholder.jpg"}
    />
  );
};

export default Avatar;
