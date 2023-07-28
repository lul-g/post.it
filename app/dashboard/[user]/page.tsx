"use client";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import MyPosts from "./MyPosts";
import { useSession } from "next-auth/react";

export default function page() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-5 bg-slate-100 relative">
      <h1 className="text-2xl my-10 font-bold text-black">
        {`${session?.user?.name?.split(" ")[0]}'s`} Dashboard
      </h1>
      <MyPosts />
    </main>
  );
}
