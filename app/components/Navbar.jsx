"use client";

import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import {
  MdLightMode,
  MdOutlineDarkMode,
  MdOutlineLogout,
  MdOutlineVideoCall,
} from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import Icon from "./Icon";
import Avatar from "./Avatar";
import useLoginModal from "./hooks/useLoginModal";
import useUploadModal from "./hooks/useUploadModel";
import useMenuModal from "./hooks/useMenuModel";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = ({ profile }) => {
  const router = useRouter();
  const searchRef = useRef();
  const menuModel = useMenuModal();
  const { theme, setTheme } = useTheme("dark");
  const { data: session } = useSession();
  const login = useLoginModal();
  const upload = useUploadModal();

  return (
    <div
      className={`bg-${theme}-bg h-12 flex items-center justify-between px-4 sm:px-6 py-[6px]`}
    >
      <div className="flex items-center gap-6">
        <Icon
          IconType={AiOutlineMenu}
          size={20}
          onClick={() => menuModel.onOpen()}
        />
        <Image src="/img/logo.png" width={35} height={15} alt="logo" />
      </div>
      <div
        className={`h-full min-w-[300px] md:min-w-[500px] hidden sm:flex items-center border-[1px] bg-${theme}-bg border-${theme}-border rounded-2xl`}
      >
        <input
          ref={searchRef}
          placeholder="Search..."
          className={`h-full w-full outline-none text-sm lr px-2 bg-${theme}-bg text-${theme}-text`}
        />
        <div
          className={`h-full w-[70px] flex items-center justify-center rr bg-${theme}-BgSoft`}
          onClick={() => router.push(`/search/${searchRef.current.value}`)}
        >
          <Icon IconType={BsSearch} size={16} />
        </div>
        {/* <FaMicrophone size={28} className="px-2" /> */}
      </div>
      <div className="flex items-center gap-3">
        {theme !== "light" ? (
          <Icon
            IconType={MdLightMode}
            size={22}
            onClick={() => setTheme("light")}
          />
        ) : (
          <Icon
            IconType={MdOutlineDarkMode}
            size={22}
            onClick={() => setTheme("dark")}
          />
        )}
        {session ? (
          <>
            <Icon
              IconType={MdOutlineVideoCall}
              size={26}
              onClick={() => upload.onOpen()}
            />
            <Icon
              IconType={MdOutlineLogout}
              size={26}
              onClick={() => signOut()}
            />
            <Link href={`/profile/${session?.user?._id}`}>
              <Avatar
                src={profile ? profile : "/img/placeholder.jpg"}
                width={30}
                height={30}
              />
            </Link>
          </>
        ) : (
          <button
            className={`px-3 py-[5px] bg-transparent border border-blue-500 text-blue-500 rounded-sm font-medium cursor-pointer flex items-center gap-1`}
            onClick={() => login.onOpen()}
          >
            <VscAccount size={20} />
            SIGN IN
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
