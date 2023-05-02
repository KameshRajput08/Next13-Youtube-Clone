"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import useCustomizeModal from "../hooks/getCustomizeModal";
import { useTheme } from "next-themes";
import { MdAddPhotoAlternate, MdClose, MdFileUpload } from "react-icons/md";
import Icon from "../Icon";
import app from "../../libs/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { useRouter } from "next/navigation";
import Input from "../Inputs/Input";
import Button from "../Inputs/Button";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";

const Customize = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { isOpen, onClose } = useCustomizeModal();
  const { theme } = useTheme();
  const [uploading, setUploading] = useState(false);
  const [userdata, setUserData] = useState({
    username: "",
    desc: "",
    image: "",
    coverImg: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  const uploadFile = ({ file, type }) => {
    setUploading(true);
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name + "";
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        type === "video" && setVideoPerc(Math.floor(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setUserData((prev) => {
            setUploading(false);
            return { ...prev, [type]: downloadURL };
          });
        });
      }
    );
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const nonEmptyFields = Object.fromEntries(
      Object.entries(userdata).filter(([key, value]) => value !== "")
    );

    try {
      if (session) {
        await axios.put(`/api/users/${session?.user?._id}`, {
          ...nonEmptyFields,
        });
      }
      onClose();
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <div className={`w-full h-full py-3 text-${theme}-text`}>
        <div
          className={`flex items-center justify-between border-b-[1px] pb-3 px-4 md:px-6  border-border`}
        >
          <h2 className=" text-xl font-semibold">Update Profile</h2>
          {uploading ? (
            <ClipLoader size={30} color={theme === "dark" ? "#fff" : "#000"} />
          ) : (
            <Icon IconType={MdClose} size={22} onClick={() => onClose()} />
          )}
        </div>
        <div className={`px-4 md:px-6 pt-4 pb-1`}>
          <Input
            type={"text"}
            name="username"
            id="username"
            label="Name"
            value={userdata.username}
            required={true}
            onChange={handleChange}
          />
          <Input
            type={"text"}
            name="desc"
            id="desc"
            label="Description"
            value={userdata.desc}
            onChange={handleChange}
          />

          <div className="mb-4 flex flex-col items-start gap-2">
            <span>Profile Picture</span>

            {userdata.image ? (
              <Image
                width={100}
                height={100}
                src={userdata.image}
                className={`object-cover rounded-full`}
                alt=""
              />
            ) : (
              <>
                <label
                  for="profilePic"
                  className={`border-[2px] cursor-pointer flex flex-col items-center justify-center border-dashed border-border w-[200px] h-[100px]`}
                >
                  <Icon IconType={MdAddPhotoAlternate} size={30} />
                  <span>Select Image</span>
                </label>
                <input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    uploadFile({ file: e.target.files[0], type: "image" })
                  }
                />
              </>
            )}
          </div>
          <div className="mb-4 flex flex-col items-start gap-2">
            <span>Cover Picture</span>

            {userdata.coverImg ? (
              <Image
                width={300}
                height={100}
                src={userdata.coverImg}
                className={`w-full h-[120px] object-cover`}
                alt=""
              />
            ) : (
              <>
                <label
                  for="CoverPic"
                  className={`border-[2px] cursor-pointer flex flex-col items-center justify-center border-dashed border-border w-[200px] h-[100px]`}
                >
                  <Icon IconType={MdAddPhotoAlternate} size={30} />
                  <span>Select Image</span>
                </label>
                <input
                  id="CoverPic"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    uploadFile({ file: e.target.files[0], type: "coverImg" })
                  }
                />
              </>
            )}
          </div>
          <Button type="submit" text="UPLOAD" onClick={handleUpload} />
        </div>
      </div>
    </Modal>
  );
};

export default Customize;
