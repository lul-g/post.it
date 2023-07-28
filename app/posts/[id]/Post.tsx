import React from "react";
import Image from "next/image";
import Spinner from "@/app/components/Spinner";
import { useState } from "react";

type Post = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  comments?: {
    id: string;
    message: string;
    createdAt: string;
    postId: string;
    userId: string;
  }[];
};

export default function Post({
  id,
  name,
  title,
  comments,
  avatar,
  createdAt,
  updatedAt,
}: Post) {
  return (
    <div className="p-6 bg-white rounded-md w-[95%] my-2 shadow-[0_0_.1rem_0_black]">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <Image
            src={avatar}
            width={30}
            height={30}
            alt="profile image of post owner"
            className="rounded-full"
          />
          <h1 className="text-black font-bold">{name}</h1>
        </div>
        <p className="text-gray-600 font-semibold font-sans">
          {new Date(createdAt).toLocaleDateString("en-us", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
      <h1 className="text-black my-6 text-sm">{title}</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <RxnButton emoji={"🔥"} emojiNum={0} />
          <RxnButton emoji={"💩"} emojiNum={0} />
        </div>
      </div>
      <p className="text-gray-500 font-semibold font-mono italic">
        Updated at:{" "}
        {new Date(updatedAt).toLocaleDateString("en-us", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
type buttonProps = {
  emoji: string;
  emojiNum: number;
};
const RxnButton = ({ emoji, emojiNum }: buttonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <button className="p-2 bg-slate-200 hover:bg-slate-300 rounded-md flex items-center gap-2">
      {emoji}{" "}
      {isLoading ? (
        <Spinner className={"text-slate-600"} />
      ) : (
        <span className="font-bold">{emojiNum}</span>
      )}
    </button>
  );
};

const CommentButton = ({ commentsLength }: { commentsLength: number }) => {
  return (
    <button className="p-2 bg-slate-200 hover:bg-slate-300 rounded-md flex items-center gap-2">
      <span className="font-bold">💬 {commentsLength}</span>
    </button>
  );
};