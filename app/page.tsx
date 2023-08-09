"use client";
import AddPost from "./components/AddPost";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import Spinner from "./components/Spinner";
import Post from "./components/Post";
import { PostType } from "./types/Posts";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";

const allPosts = async (page: number) => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data.slice((page - 1) * 2, page * 2);
};

export default function Home() {
  // const {
  //   data,
  //   isSuccess,
  //   error,
  //   isLoading,
  //   fetchNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   hasNextPage,
  // } = useInfiniteQuery<PostType[]>(
  //   ["posts"],
  //   async ({ pageParam = 1 }) => {
  //     const res = await allPosts(pageParam);
  //     return res;
  //   },
  //   {
  //     getNextPageParam: (_, pages) => {
  //       return pages.length + 1;
  //     },
  //   }
  // );

  // const lastPostRef = useRef<HTMLElement>(null);
  // const { ref, entry } = useIntersection({
  //   root: lastPostRef.current,
  //   threshold: 1,
  // });

  // useEffect(() => {
  //   if (entry?.isIntersecting) fetchNextPage();
  // }, [entry]);

  // const posts = data?.pages.flatMap((page) => page);

  // if (error) return "Some error occured when getting posts";
  // if (isLoading)
  //   return (
  //     <div className="flex items-center w-full h-screen justify-center gap-2 bg-white">
  //       <Spinner className="w-8 h-8 text-black" />
  //       <span className="text-black font-bold">Loading...</span>
  //     </div>
  //   );
  const [isLoading, setIsLoading] = useState(false);
  return (
    // <main className="flex min-h-screen flex-col items-center justify-start py-5 bg-slate-100 relative">
    //   <AddPost />
    //   <div className="w-full flex flex-col items-center justify-center">
    //     {!data?.pages?.length && !isLoading && (
    //       <div className="my-5 font-bold text-2xl sm:text-3xl text-center">
    //         No content at this time😥
    //       </div>
    //     )}
    //     {posts?.map((post: PostType, i: number) => {
    //       if (i === posts.length - 1) {
    //         return <div key={post.id} ref={ref}></div>;
    //       }
    //       return (
    //         <Post
    //           key={post.id}
    //           id={post.id}
    //           name={post.user.name}
    //           avatar={post.user.image}
    //           title={post.title}
    //           comments={post.comments}
    //           fires={post.fires}
    //           poops={post.poops}
    //         />
    //       );
    //     })}
    //     <div>
    //       {isFetching || isFetchingNextPage ? (
    //         <Spinner className="text-black" />
    //       ) : !hasNextPage || data?.pages?.length ? (
    //         <h1 className="text-center text-black font-bold">
    //           Yay you have seen all posts for now!😎
    //         </h1>
    //       ) : (
    //         "null"
    //       )}
    //     </div>
    //   </div>
    // </main>
    <main className="flex min-h-screen flex-col items-center justify-start bg-slate-100 relative">
      {isLoading ? (
        <div className="flex items-center w-full h-screen justify-center gap-2 bg-white">
          <Spinner className="w-8 h-8 text-black" />
          <span className="text-black font-bold">Loading...</span>
        </div>
      ) : (
        <div className="mt-5 w-full">
          <AddPost disabled={true} />

          <div className="mt-28 font-bold text-2xl text-center h-full bg-white text-black p-4 mx-auto w-[90%] rounded-md">
            Sorry we are experiencing a rate limit from our database provider😥
          </div>
        </div>
      )}
    </main>
  );
}
