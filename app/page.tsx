"use client";
import Image from "next/image";
import AddPost from "./components/AddPost";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./components/Spinner";
import Post from "./components/Post";
import { PostType } from "./types/Posts";

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return "Some error occured when getting posts";
  if (isLoading)
    return (
      <div className="flex items-center w-full h-screen justify-center gap-2 bg-white">
        <Spinner className="w-8 h-8 text-black" />
        <span className="text-black font-bold">Loading...</span>
      </div>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-5 bg-slate-100 relative">
      <AddPost />
      <div className="w-full flex flex-col items-center justify-center">
        {!data?.length && (
          <div className="my-5 font-bold text-3xl">
            No content at this time😥
          </div>
        )}
        {data?.map((post: PostType) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              name={post.user.name}
              avatar={post.user.image}
              title={post.title}
              comments={post.comments}
            />
          );
        })}
      </div>
    </main>
  );
}
