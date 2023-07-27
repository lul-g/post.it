"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "@/app/types/AuthPosts";
import { useState } from "react";
import Spinner from "@/app/components/Spinner";
import Post from "./Post";
import Link from "next/link";

const fetchPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

export default function MyPosts(): JSX.Element {
  const { data, isLoading, error } = useQuery<AuthPosts>({
    queryFn: fetchPosts,
    queryKey: ["authPosts"],
  });
  if (error) return <div>some error</div>;
  if (isLoading)
    return (
      <div className="flex items-center w-full h-[50vh] justify-center gap-2 bg-transparent">
        <Spinner className="w-8 h-8 text-black" />
        <span className="text-black font-bold">Loading...</span>
      </div>
    );

  return (
    <div className="w-full flex flex-col items-center justify-center z-0">
      {!data?.posts.length && (
        <div className="text-center">
          <h1 className="font-bold text-3xl my-10">No posts so far😞</h1>
          <Link href="/" className="bg-white p-4 rounded-lg ">
            Click here to create a post🤯
          </Link>
        </div>
      )}
      {data?.posts &&
        data?.posts.map((post) => {
          return (
            <Post
              key={post.id}
              postId={post.id}
              userId={data.id}
              name={data.name}
              img={data.image}
              title={post.title}
            />
          );
        })}
    </div>
  );
}
