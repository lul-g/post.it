import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import MyPosts from "./MyPosts";

export default async function page() {
  // const session = await unstable_getServerSession();
  const session = await unstable_getServerSession(authOptions);
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
