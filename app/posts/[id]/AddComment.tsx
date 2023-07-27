import React, { useState } from "react";
import { Textarea } from "@/app/components/textarea";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Spinner from "@/app/components/Spinner";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

type addCommentProps = {
  postId: string;
};

export default function AddComment({ postId }: addCommentProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  async function addComment(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    mutate(message);
  }

  const { mutate } = useMutation(
    async (message: string) =>
      await axios.post("/api/comments/addComment", {
        postId,
        message,
      }),
    {
      onError: (error) => {
        if (error instanceof AxiosError)
          toast.error(error?.response?.data?.message!, {
            icon: error?.response?.data?.icon!,
            style: {
              background: "#333",
              color: "#fff",
            },
          });
        setIsLoading(false);
      },
      onSuccess: (success) => {
        toast.success("Comment has been made", {
          icon: "🔥",
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        queryClient.invalidateQueries();
        setMessage("");
        setIsLoading(false);
      },
    }
  );
  return (
    <form
      onSubmit={addComment}
      action=""
      className="mx-auto w-[95%] p-5 bg-white shadow-[0_0_.1rem_0_black] rounded-md mt-2"
    >
      <Textarea
        name="title"
        value={message}
        placeholder="Comment on this post"
        onChange={(e) => setMessage(e.target.value)}
        className="h-[5rem] bg-gray-50"
      />
      <div className="flex justify-between items-center font-bold">
        <p
          className={`${message.length < 200 ? "text-black" : "text-red-500"}`}
        >
          {message.length}/200
        </p>
        <button
          type="submit"
          disabled={isLoading}
          className={`font-bold py-1 px-3 rounded-md bg-black text-white hover:bg-opacity-70 hover:border-gray-600 transition-all ease-out mt-2 border-2 ${
            isLoading
              ? "bg-opacity-70 border-gray-600 cursor-not-allowed"
              : "bg-opacity-100 border-gray-800"
          }`}
        >
          {!isLoading ? (
            "Comment"
          ) : (
            <>
              <span>Commenting...</span>
              <Spinner className="" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
