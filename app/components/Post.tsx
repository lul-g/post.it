import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import { useRef } from "react";

export default function Post({ id, name, avatar, title, comments }) {
  return (
    <div className="p-6 bg-white rounded-md w-[95%] my-2 shadow-[0_0_.1rem_0_black]">
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
          <CommentButton comments={comments.length} />
        </div>
      </div>
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

const CommentButton = ({ comments }) => {
  return (
    <button className="p-2 bg-slate-200 hover:bg-slate-300 rounded-md flex items-center gap-2">
      {comments.length ? (
        <span className="font-bold">💬 45</span>
      ) : (
        <span className="font-bold">Add Comment</span>
      )}
    </button>
  );
};
