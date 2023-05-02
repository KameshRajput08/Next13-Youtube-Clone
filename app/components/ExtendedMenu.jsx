"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Icon from "./Icon";
import {
  MdClose,
  MdDirectionsBike,
  MdEventNote,
  MdLightMode,
  MdLiveTv,
  MdLocalMovies,
  MdOutlineDarkMode,
  MdSettings,
  MdVideogameAsset,
  MdOutlineExplore,
  MdOutlineHistory,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdLibraryMusic,
} from "react-icons/md";
import { useTheme } from "next-themes";
import { AiOutlineHome } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import Hr from "./Hr";
import useMenuModal from "./hooks/useMenuModel";

const items = [
  { title: "Music", href: "/", icon: MdLibraryMusic },
  { title: "Sports", href: "/explore", icon: MdDirectionsBike },
  { title: "Gaming", href: "/suscriptions", icon: MdVideogameAsset },
  { title: "Movies", href: "/library", icon: MdLocalMovies },
  { title: "News", href: "/history", icon: MdEventNote },
  { title: "Live", href: "/", icon: MdLiveTv },
];

const ExtendedMenu = ({ id }) => {
  const menuModel = useMenuModal();
  const router = useRouter();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`bg-${theme}-BgSoft h-screen w-[220px] absolute top-0 ${
        menuModel.isOpen ? "left-0" : "left-[-220px]"
      } overflow-y-scroll text-${theme}-text bg-${theme}-bg text-xs z-50 transition-all duration-500 ease-in-out px-2`}
    >
      <div className="relative py-5">
        <div className={`flex justify-between px-5 cursor-pointer mb-2`}>
          <Image width={40} height={30} src="/img/logo.png" alt="" />
          <Icon
            IconType={MdClose}
            size={22}
            onClick={() => menuModel.onClose()}
          />
        </div>
        <Link href="/">
          <div
            className={`flex items-center gap-5 cursor-pointer px-5 py-[10px] w-full text-[12px] rounded-md hover:bg-${theme}-BgSoft`}
          >
            <Icon IconType={AiOutlineHome} size={20} /> Home
          </div>
        </Link>
        <Link href={"?videos=trending"}>
          <div
            className={`flex items-center gap-5 cursor-pointer px-5 py-[10px] w-full text-[12px] rounded-md hover:bg-${theme}-BgSoft`}
          >
            <Icon IconType={MdOutlineExplore} size={20} />
            Explore
          </div>
        </Link>
        <Link href={"?videos=suscriptions"}>
          <div
            className={`flex items-center gap-5 cursor-pointer px-5 py-[10px] w-full text-[12px] rounded-md hover:bg-${theme}-BgSoft`}
          >
            <Icon IconType={MdOutlineSubscriptions} size={20} />
            Subscriptions
          </div>
        </Link>
        <Hr />

        <div
          className={`flex items-center gap-5 cursor-pointer px-5 py-[10px] w-full text-[12px] rounded-md hover:bg-${theme}-BgSoft`}
        >
          <Icon IconType={MdOutlineVideoLibrary} size={20} />
          Library
        </div>
        <div
          className={`flex items-center gap-5 cursor-pointer px-5 py-[10px] w-full text-[12px] rounded-md hover:bg-${theme}-BgSoft`}
        >
          <Icon IconType={MdOutlineHistory} size={20} />
          History
        </div>
        <Hr />
        {!session?.user && (
          <>
            <div className="px-[18px] flex flex-col gap-4">
              Sign in href like videos, comment, and subscribe.
              <Link href="SignIn">
                <button className="px-3 py-[5px] bg-transparent border border-blue-500 text-blue-500 rounded-sm font-medium cursor-pointer flex items-center gap-1">
                  <VscAccount size={20} />
                  SIGN IN
                </button>
              </Link>
            </div>
            <Hr />
          </>
        )}
        <h2 className="text-base font-medium text-gray-400 mb-5 px-[18px]">
          BEST OF YOUTUBE
        </h2>
        {items.map((item) => (
          <div
            key={item.title}
            className={`flex items-center gap-5 cursor-pointer px-5 py-[10px] w-full text-[12px] rounded-md hover:bg-${theme}-BgSoft`}
          >
            <Icon IconType={item.icon} size={20} />
            {item.title}
          </div>
        ))}
        <Hr />
        <div
          className={`flex items-center gap-5 cursor-pointer px-5 py-[10px] w-full text-[12px] rounded-md hover:bg-${theme}-BgSoft`}
          onClick={() => router.push(`/profile/${id}`)}
        >
          <Icon IconType={MdSettings} size={20} />
          Settings
        </div>
        <div
          className={`flex items-center gap-5 cursor-pointer px-5 py-[10px] w-full text-[12px] rounded-md hover:bg-${theme}-BgSoft`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme !== "light" ? (
            <>
              <Icon IconType={MdLightMode} size={22} />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Icon IconType={MdOutlineDarkMode} size={22} />
              <span>Dark Mode</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtendedMenu;
