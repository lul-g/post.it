import React, { useEffect } from "react";
import Image from "next/image";
import Spinner from "@/app/components/Spinner";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

let Filter = require("bad-words"),
  filter = new Filter();
filter.addWords("nigggggggaaaaaaaaaassssss", "gay");
type Post = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  fires: {
    id: string;
    postId: string;
    userId: string;
  }[];
  poops: {
    id: string;
    postId: string;
    userId: string;
  }[];
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
  fires,
  poops,
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
      <h1 className="text-black my-6 text-sm">{filter.clean(title)}</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <RxnButton
            emoji={"🔥"}
            emojiNum={fires.length}
            emojiType="fire"
            postId={id}
          />
          <RxnButton
            emoji={"💩"}
            emojiNum={poops.length}
            emojiType="poop"
            postId={id}
          />
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
  emojiType: string;
  emojiNum: number;
  postId: string;
};

const RxnButton = ({ emoji, emojiType, emojiNum, postId }: buttonProps) => {
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const [clicked, setClicked] = useState(
    JSON.parse(localStorage.getItem(`${emojiType}_${postId}`)!) || false
  );

  const queryClient = useQueryClient();

  function addRxn() {
    setBtnIsLoading(true);
    mutate(emojiType == "fire" ? "fire" : "poop");
  }
  const { mutate } = useMutation(
    async (rxn: string) =>
      !clicked
        ? await axios.post("/api/posts/reactions/addReaction", { rxn, postId })
        : await axios.delete(`/api/posts/reactions/deleteReaction`, {
            data: {
              rxn,
              postId,
            },
          }),

    {
      onError: (error) => {
        if (error instanceof AxiosError)
          toast.error(error?.response?.data.message, {
            icon: error?.response?.data.icon,
            style: {
              background: "#333",
              color: "#fff",
            },
          });
        setBtnIsLoading(false);
      },
      onSuccess: (success) => {
        queryClient.invalidateQueries();
        setBtnIsLoading(false);
        setClicked(!clicked);
        localStorage.setItem(
          `${emojiType}_${postId}`,
          JSON.stringify(!clicked)
        );
      },
    }
  );

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        addRxn();
      }}
      className="p-2 bg-slate-200 hover:bg-slate-300 rounded-md flex items-center gap-2"
    >
      {emoji}{" "}
      {btnIsLoading ? (
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
