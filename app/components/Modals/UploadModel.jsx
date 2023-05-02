"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import useUploadModal from "../hooks/useUploadModel";
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

const Upload = () => {
  // const { data: session } = useSession();
  const router = useRouter();
  const { isOpen, onClose } = useUploadModal();
  const [videoPerc, setVideoPerc] = useState(null);
  const { theme } = useTheme();
  const [step, setStep] = useState(1);
  const [videoData, setVideoData] = useState({
    title: "",
    desc: "",
    video: "",
    thumbnail: "",
    tags: [],
  });

  const handleChange = (e) => {
    setVideoData({
      ...videoData,
      [e.target.name]: e.target.value,
    });
  };

  const uploadFile = ({ file, type }) => {
    setStep(2);
    console.log(file);
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
          setVideoData((prev) => {
            return { ...prev, [type]: downloadURL };
          });
        });
      }
    );
  };

  const handleTagRemove = (indexToRemove) => {
    setVideoData((prevVideoData) => {
      return {
        ...prevVideoData,
        tags: prevVideoData.tags.filter((_, index) => index !== indexToRemove),
      };
    });
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag !== "") {
        setVideoData((prevState) => ({
          ...prevState,
          tags: [...prevState.tags, newTag],
        }));
        e.target.value = "";
      }
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/videos`, { ...videoData });
      onClose();
      router.push(`/video/${res.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  let body = (
    <>
      <div className={`py-20 m-auto flex flex-col items-center gap-2`}>
        <Icon IconType={MdFileUpload} size={60} />
        <span className={`font-medium`}>
          Drag and drop video files to upload
        </span>
        <label
          for="file-upload"
          className="w-36 block bg-blue-500 hover:bg-blue-600 text-white whitespace-nowrap font-semibold rounded-sm
      px-4 py-2 mt-6"
        >
          SELECT FILES
        </label>
        <input
          id="file-upload"
          className="hidden"
          type="file"
          accept="video/*"
          onChange={(e) =>
            uploadFile({ file: e.target.files[0], type: "video" })
          }
        />
      </div>
    </>
  );

  if (step === 2) {
    body = (
      <div className={`px-4 md:px-6 py-4`}>
        <Input
          type={"text"}
          name="title"
          id="title"
          label="Title"
          value={videoData.title}
          required={true}
          onChange={handleChange}
        />
        <div className="relative mb-4">
          <textarea
            type="text"
            id="desc"
            rows={3}
            name="desc"
            value={videoData.desc}
            onChange={handleChange}
            className={`block px-2.5 pb-1.5 pt-3 w-full text-sm text-${theme}-text bg-transparent rounded-lg border-[1px] appearance-none border-border focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          />
          <label
            for="desc"
            className={`absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-${theme}-bgSoft px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1`}
          >
            Discription
          </label>
        </div>
        <div className="mb-4 flex flex-col items-start gap-2">
          <span>Thumbnail</span>

          {videoData.thumbnail ? (
            <Image
              width={180}
              height={100}
              src={videoData.thumbnail}
              className={`w-[180px] h-[100px] object-cover`}
              alt=""
            />
          ) : (
            <>
              <label
                for="thumbnail"
                className={`border-[2px] cursor-pointer flex flex-col items-center justify-center border-dashed border-border w-[200px] h-[100px]`}
              >
                <Icon IconType={MdAddPhotoAlternate} size={30} />
                <span>Upload Thumbnail</span>
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  uploadFile({ file: e.target.files[0], type: "thumbnail" })
                }
              />
            </>
          )}
        </div>
        <div
          className={`flex items-center flex-wrap  gap-1 px-2 py-1 w-full text-sm bg-transparent rounded-lg border-[1px] appearance-none border-border focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
        >
          {videoData?.tags?.map(
            (tag, index) =>
              tag.length > 0 && (
                <div key={index}
                  className={`px-2 flex items-center gap-1 py-1 rounded-md bg-${theme}-bg`}
                >
                  <span>{tag}</span>
                  <Icon
                    IconType={MdClose}
                    size={16}
                    onClick={() => handleTagRemove(index)}
                  />
                </div>
              )
          )}
          <div className="flex w-full gap-2 items-center justify-between">
            <input
              id="inputTag"
              type="text"
              onKeyDown={handleKeyDown}
              placeholder="Enter tag name"
              className="h-8 px-2 bg-transparent"
            />
          </div>
        </div>
        <Button type="submit" text="UPLOAD" onClick={handleUpload} />
        <div className={`border-t-[1px] mt-6 pt-4 border-border`}>
          <span className=" text-base font-medium">
            {videoPerc}% uploading complete...
          </span>
        </div>
      </div>
    );
  }

  return (
    <Modal isOpen={isOpen}>
      <div className={`w-full h-full py-3 text-${theme}-text`}>
        <div
          className={`flex items-center justify-between border-b-[1px] pb-3 px-4 md:px-6  border-border`}
        >
          <h2 className=" text-xl font-semibold">Upload video</h2>
          <Icon IconType={MdClose} size={22} onClick={() => onClose()} />
        </div>
        {body}
      </div>
    </Modal>
  );
};

export default Upload;
