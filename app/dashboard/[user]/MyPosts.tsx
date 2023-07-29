"use client";
import axios from "axios";
import Spinner from "@/app/components/Spinner";
import Post from "./Post";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { PostType } from "@/app/types/Posts";

const fetchPosts = async (page: number) => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data.slice((page - 1) * 2, page * 2);
};

export default function MyPosts(): JSX.Element {
  const {
    data,
    isSuccess,
    error,
    isLoading,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<PostType[]>(
    ["authPosts"],
    async ({ pageParam = 1 }) => {
      const res = await fetchPosts(pageParam);
      return res;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );

  const lastAuthPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastAuthPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  const posts = data?.pages.flatMap((page) => page);

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
      {!posts?.length ? (
        <div className="text-center">
          <h1 className="font-bold text-3xl my-10">No posts so far😞</h1>
          <Link href="/" className="bg-white p-4 rounded-lg ">
            Click here to create a post🤯
          </Link>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center z-0">
          {posts?.map((post: PostType, i: number) => {
            if (i === posts.length - 1) {
              return <div key={post.id} ref={ref}></div>;
            }
            return (
              <Post
                key={post.id}
                postId={post.id}
                userId={post.user.id}
                name={post.user.name}
                img={post.user.image}
                title={post.title}
              />
            );
          })}
          <div>
            {isFetching || isFetchingNextPage ? (
              <Spinner className="text-black" />
            ) : !hasNextPage || data?.pages?.length ? (
              <h1 className="text-center text-black font-bold flex flex-col gap-2 ">
                No posts left to see!
                <Link
                  href="/"
                  className="bg-white border-2 border-black p-4 rounded-lg hover:bg-opacity-10 "
                >
                  Click here to create more posts😎
                </Link>
              </h1>
            ) : (
              "null"
            )}
          </div>
        </div>
      )}
    </div>
  );
}
