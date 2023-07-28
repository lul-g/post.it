import React, { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "../components/Spinner";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

type Post = {
  id: string;
  name: string;
  title: string;
  avatar: string;
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
  avatar,
  title,
  comments,
  fires,
  poops,
}: Post) {
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
          <RxnButton
            emoji={"🔥"}
            emojiNum={fires.length}
            postId={id}
            emojiType={"fire"}
          />
          <RxnButton
            emoji={"💩"}
            emojiNum={poops.length}
            postId={id}
            emojiType={"poop"}
          />
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
        // setCount(!clicked ? count + 1 : count - 1);
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
      {commentsLength ? (
        <span className="font-bold">💬 {commentsLength}</span>
      ) : (
        <span className="font-bold">Add Comment</span>
      )}
    </button>
  );
};
