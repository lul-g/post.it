"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostType } from "@/app/types/Posts";
import Spinner from "@/app/components/Spinner";
import Post from "./Post";
import AddComment from "./AddComment";
import Image from "next/image";

const fetchDetail = async (id: string) => {
  const response = await axios.get(`/api/posts/getPost?id=${id}`);
  return response.data;
};
type URL = {
  params: {
    id: string;
  };
};
export default function page(url: URL) {
  const { data, isLoading, error } = useQuery<PostType>({
    queryFn: () => fetchDetail(url.params.id),
    queryKey: ["postDetail"],
  });
  if (error) return <div>some error</div>;
  if (isLoading)
    return (
      <div className="flex items-center w-full h-screen justify-center gap-2 bg-white">
        <Spinner className="w-8 h-8 text-black" />
        <span className="text-black font-bold">Loading...</span>
      </div>
    );
  console.log(data);
  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-5 bg-slate-100 relative ">
      <Post
        id={data?.id!}
        name={data?.user.name!}
        avatar={data?.user.image!}
        title={data?.title!}
        comments={data?.comments!}
        createdAt={data?.createdAt!}
        updatedAt={data?.updatedAt!}
      />
      <AddComment postId={data?.id!} />
      {data?.comments?.length ? (
        <>
          <h1 className="text-center font-bold text-2xl mt-8 ">All comments</h1>
          {data?.comments!.map((comment) => {
            return (
              <Comment
                key={comment.id}
                id={comment?.id}
                message={comment?.message}
                createdAt={comment?.createdAt}
                user={comment?.user!}
              />
            );
          })}
        </>
      ) : (
        <h1 className="text-center font-bold text-2xl mt-12">
          No comments found for this post😥
        </h1>
      )}
    </div>
  );
}

interface commentData {
  id: string;
  message: string;
  createdAt: string;
  user: User;
}
type User = {
  id: string;
  email: string;
  image: string;
  name: string;
};
function Comment({ id, message, createdAt, user }: commentData) {
  return (
    <div className="p-6 bg-white rounded-md w-[95%] my-2 shadow-[0_0_.1rem_0_black]">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-x-2 items-center">
          <Image
            src={user?.image!}
            width={30}
            height={30}
            alt="profile image of post owner"
            className="rounded-full"
          />
          <h1 className="text-black font-bold">{user?.name!}</h1>
        </div>
        <p className="text-gray-600 font-semibold font-sans">
          {new Date(createdAt!).toLocaleDateString("en-us", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
      <span>{message}</span>
    </div>
  );
}
