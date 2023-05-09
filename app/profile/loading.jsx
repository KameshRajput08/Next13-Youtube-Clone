import React from "react";
import LoadingCard from "../components/LoadingCard";
import Image from "next/image";

const loading = () => {
  return (
    <div
      className={`w-full h-[calc(100vh-48px)] p-0 md:p-10 flex flex-col gap-6`}
    >
      <Image
        width={500}
        height={200}
        src={""}
        className={`w-full min-h-[200px] object-cover bg-gray-400`}
        alt="cover image"
      />
      <div
        className={` h-[200px] w-full bg-gray-400 mb-4`}
      ></div>
      <div className=" w-full">
        <div className="animate-pulse flex space-x-4 w-full ">
          <div className="rounded-full bg-gray-400 h-16 w-16"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-[18px] bg-gray-400 rounded w-[70%]"></div>
            <div className="space-y-2">
              <div className="h-[16px] bg-gray-400 rounded w-[95%]"></div>
              <div className="h-[16px] bg-gray-400 rounded w-[80%]"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 p-0 sm:py-10 sm:px-6">
        {["", "", "", "", "", "", "", ""].map((card, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default loading;
