import React from "react";

const LoadingCard = () => {
  return (
    <div className={`bg-transparent p-0 w-full mb-2`}>
      <div
        className={`animate-pulse space-x-4 w-full h-28 sm:h-36 md:h-40 bg-gray-400 mb-4 rounded-lg`}
      ></div>
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-400 h-10 w-10"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-[14px] bg-gray-400 rounded w-[70%]"></div>
          <div className="space-y-2">
            <div className="h-[12px] bg-gray-400 rounded w-[95%]"></div>
            <div className="h-[12px] bg-gray-400 rounded w-[80%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
