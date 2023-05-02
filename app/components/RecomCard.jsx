import Image from "next/image";
import { getUserById } from "../actions/getCurrentUser";
import { format } from "timeago.js";
import Link from "next/link";

const RecomCard = async ({ video, theme }) => {
  const { username, _id } = await getUserById(video.user.toString());
  return (
    <Link href={`/video/${video._id}`}>
      <div className={`flex gap-2 mb-4`}>
        <div className="flex-[1.5]">
          <Image
            width={220}
            height={100}
            src={video.thumbnail}
            className={`w-full h-full object-cover rounded-md`}
            alt="thumbnail"
          />
        </div>
        <div className={`flex-[2] flex items-start flex-col gap-[2px]`}>
          <h2 className={`text-[16px] font-[600]`}>
            {video.title}
          </h2>
          <Link href={`/profile/${_id}`}>
            <span className={`text-[13px] text-[#aaa]`}>{username}</span>
          </Link>
          <div className={`text-[12px] font-medium text-[#aaa]`}>
            {video?.views} views • {format(video?.createdAt)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecomCard;
