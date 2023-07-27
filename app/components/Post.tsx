import React, { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "../components/Spinner";
import Link from "next/link";
type Post = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  comments?: {
    id: string;
    message: string;
    createdAt: string;
    postId: string;
    userId: string;
  }[];
};
export default function Post({ id, name, avatar, title, comments }: Post) {
  return (
    <Link
      href={`/posts/${id}`}
      className="p-6 bg-white rounded-md w-[95%] my-2 shadow-[0_0_.1rem_0_black]"
    >
      <div className="flex gap-2 items-center">
        <Image
          src={avatar}
          width={30}
          height={30}
          alt="profile image of post owner"
          className="rounded-full"
        />
        <h1 className="text-black font-bold">{name}</h1>
      </div>
      <h1 className="text-black mt-4 mb-2 text-sm">{title}</h1>
      <div className="flex items-center justify-between  mt-6">
        <div className="flex items-center gap-3">
          <RxnButton emoji={"🔥"} emojiNum={0} />
          <RxnButton emoji={"💩"} emojiNum={0} />
        </div>
        <div>
          <CommentButton commentsLength={comments!.length} />
        </div>
      </div>
    </Link>
  );
}

type buttonProps = {
  emoji: string;
  emojiNum: number;
};

const RxnButton = ({ emoji, emojiNum }: buttonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
      }}
      className="p-2 bg-slate-200 hover:bg-slate-300 rounded-md flex items-center gap-2"
    >
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
      {commentsLength ? (
        <span className="font-bold">💬 {commentsLength}</span>
      ) : (
        <span className="font-bold">Add Comment</span>
      )}
    </button>
  );
};
