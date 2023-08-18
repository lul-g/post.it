import React, { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "../components/Spinner";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

let Filter = require("bad-words"),
  filter = new Filter();
filter.addWords("nigggggggaaaaaaaaaassssss", "gay");

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

const fadeIn = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
    },
  },
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
    <motion.div
      className="bg-white rounded-md w-[95%] my-2 shadow-[0_0_.1rem_0_black] p-6 relative"
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <Link
        href={`/posts/${id}`}
        className="absolute top-6 right-6 bg-slate-200 rounded-md p-2 font-bold hover:bg-slate-300 z-50"
      >
        📌 Details
      </Link>
      <div>
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
        <h1 className="text-black mt-4 mb-2 text-sm">{filter.clean(title)}</h1>
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
            <CommentButton commentsLength={comments!.length} id={id} />
          </div>
        </div>
      </div>
    </motion.div>
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

const CommentButton = ({
  commentsLength,
  id,
}: {
  commentsLength: number;
  id: string;
}) => {
  return (
    <Link
      href={`/posts/${id}`}
      className="p-2 bg-slate-200 hover:bg-slate-300 rounded-md flex items-center gap-2"
    >
      {commentsLength ? (
        <span className="font-bold">💬 {commentsLength}</span>
      ) : (
        <span className="font-bold">Add Comment</span>
      )}
    </Link>
  );
};
