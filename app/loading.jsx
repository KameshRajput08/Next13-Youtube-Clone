import React from "react";
import Image from "next/image";
import LoadingCard from "./components/LoadingCard";

const loading = () => {
  return (
    <div className={`w-screen h-screen relative overflow-hidden`}>
      <div
        className={`h-12 flex items-center justify-between px-4 sm:px-6 py-[6px]`}
      >
        <div className="flex items-center gap-6">
          <div className="w-6 h-6 rounded-full"></div>
          <Image src="/img/logo.png" width={35} height={15} alt="logo" />
        </div>
        <div
          className={`h-full min-w-[300px] md:min-w-[500px] hidden sm:flex items-center border-[1px] rounded-2xl`}
        >
          <input
            placeholder="Search..."
            className={`h-full w-full outline-none text-sm lr px-2`}
          />
          <div
            className={`h-full w-[70px] flex items-center justify-center rr`}
          >
            <div className="w-6 h-6 rounded-full"></div>
          </div>
        </div>
        <button
          className={`px-3 py-[5px] bg-transparent border border-blue-500 text-blue-500 rounded-sm font-medium cursor-pointer flex items-center gap-1`}
        >
          <div className="w-6 h-6 rounded-full"></div>
          SIGN IN
        </button>
      </div>
      <div className={`w-screen flex h-[calc(100vh-48px)] overflow-hidden`}>
        {/* <div
          className={`hidden sm:inline-block flex-[0.4] h-screen text-sm sticky top-0 left-0 z-999`}
        >
          <div>
            <Link href="/">
              <div
                className={`flex flex-col items-center w-full text-[10px] py-[15px] rounded-md gap-1 cursor-pointer`}
              >
                <Icon IconType={AiOutlineHome} size={20} />
                Home
              </div>
            </Link>
            <Link href={"?videos=trending"}>
              <div
                className={`flex flex-col items-center w-full text-[10px] py-[15px] rounded-md gap-1 cursor-pointer`}
              >
                <Icon IconType={MdOutlineExplore} size={20} />
                Explore
              </div>
            </Link>
            <Link href={"?videos=suscriptions"}>
              <div
                className={`flex flex-col items-center w-full text-[10px] py-[15px] rounded-md gap-1 cursor-pointer`}
              >
                <Icon IconType={MdOutlineSubscriptions} size={20} />
                Subscriptions
              </div>
            </Link>
            <div
              className={`flex flex-col items-center w-full text-[10px] py-[15px] rounded-md gap-1 cursor-pointer`}
            >
              <Icon IconType={MdOutlineVideoLibrary} size={20} />
              Library
            </div>
            <div
              className={`flex flex-col items-center w-full text-[10px] py-[15px] rounded-md gap-1 cursor-pointer`}
            >
              <Icon IconType={MdOutlineHistory} size={20} />
              History
            </div>
          </div>
        </div> */}
        <div className={`flex-[7] overflow-y-scroll`}>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 p-0 sm:py-10 sm:px-6">
            {["", "", "", "", "", "", "", ""].map((card, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
