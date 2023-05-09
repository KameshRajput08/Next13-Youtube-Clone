import React from "react";

const loading = () => {
  return (
    <div
      className={`w-full h-[calc(100vh-48px)] p-0 md:p-10 flex flex-col md:flex-row gap-6`}
    >
      <div className=" w-full sm:w-[60%] md:w-[70%]">
        <div
          className={`animate-pulse space-x-4 h-[180px] md:h-[350px] w-full bg-gray-400 mb-4 rounded-lg`}
        ></div>
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
      <div className="w-full sm:w-[40%] md:w-[30%] flex flex-col gap-2">
        {["", "", "", "", "", "", ""].map((e) => (
          <div className="flex items-start gap-2">
            <div
              className={`animate-pulse space-x-4 h-20 flex-[1.2] bg-gray-400 mb-4 rounded-lg`}
            ></div>
            <div className="flex-[1] flex flex-col gap-2">
              <div className="h-[12px] bg-gray-400 rounded w-[95%]"></div>
              <div className="h-[12px] bg-gray-400 rounded w-[80%]"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default loading;
