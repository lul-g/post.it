"use client";

import { useState } from "react";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
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
        toast.success("Post has been made", {
          icon: "🔥",
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        queryClient.invalidateQueries();
        setTitle("");
        setBtnIsLoading(false);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnIsLoading(true);
    mutate(title);
  };
  return (
    <form
      onSubmit={submitPost}
      className="mx-auto w-[95%] p-5 bg-white border-2 border-gray-300 rounded-md mb-5"
      action=""
    >
      <Textarea
        value={title}
        name="title"
        placeholder="What's on your mind"
        onChange={(e) => setTitle(e.target.value)}
        className="h-[5rem] bg-gray-200"
      />
      <div className="flex justify-between items-center mt-4">
        <p className={`font-bold ${title.length > 300 ? "text-red-400" : ""}`}>
          {title.length}/300
        </p>
        {!btnIsLoading && (
          <Button className="" type="submit">
            Post It <span className="pl-1">🚀</span>
          </Button>
        )}
        {btnIsLoading && (
          <Button
            type="submit"
            disabled={btnIsLoading}
            className="inline-flex w-auto select-none appearance-none items-center justify-center space-x-2 rounded-md border bg-black px-3 py-2 text-sm font-medium text-white transition focus:border-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span>Posting...</span>
            <Spinner className="" />
          </Button>
        )}
      </div>
    </form>
  );
}
