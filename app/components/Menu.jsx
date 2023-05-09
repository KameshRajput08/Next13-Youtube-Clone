"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  MdOutlineExplore,
  MdOutlineHistory,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import Icon from "./Icon";
import { AiOutlineHome } from "react-icons/ai";

const Menu = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`hidden sm:flex flex-[0.4] bg-${theme}-bg text-${theme}-bg text-${theme}-text h-screen text-sm sticky top-0 left-0 z-999`}
    >
      <div>
        <Link href="/">
          <div
            className={`flex flex-col items-center w-full text-[10px] py-[15px] rounded-md gap-1 cursor-pointer hover:bg-${theme}-BgSoft`}
          >
            <Icon IconType={AiOutlineHome} size={20} />
            Home
          </div>
        </Link>
        <Link href={"?videos=trending"}>
          <div
            className={`flex flex-col items-center w-full text-[10px] py-[15px] rounded-md gap-1 cursor-pointer hover:bg-${theme}-BgSoft`}
          >
            <Icon IconType={MdOutlineExplore} size={20} />
            Explore
          </div>
        </Link>
        <Link href={"?videos=suscriptions"}>
          <div
            className={`flex flex-col items-center w-full text-[10px] py-[15px] rounded-md gap-1 cursor-pointer hover:bg-${theme}-BgSoft`}
          >
            <Icon IconType={MdOutlineSubscriptions} size={20} />
            Subscriptions
          </div>
        </Link>
        <div
          className={`flex flex-col items-center w-full text-[10px] py-[15px] rounded-md gap-1 cursor-pointer hover:bg-${theme}-BgSoft`}
        >
          <Icon IconType={MdOutlineVideoLibrary} size={20} />
          Library
        </div>
        <div
          className={`flex flex-col items-center w-full text-[10px] py-[15px] rounded-md gap-1 cursor-pointer hover:bg-${theme}-BgSoft`}
        >
          <Icon IconType={MdOutlineHistory} size={20} />
          History
        </div>
      </div>
    </div>
  );
};

export default Menu;
