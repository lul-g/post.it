import React from "react";
import Link from "next/link";
import Signin from "./auth/Signin";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import ProfileImg from "./auth/ProfileImg";

async function Nav() {
  const session = await getServerSession(authOptions);
  return (
    <nav className={`p-5 w-full flex justify-between items-center bg-white`}>
      <Link href={"/"} className="font-bold text-2xl">
        🚀Post.it
      </Link>
      <ul className="flex justify-center gap-5 font-bold">
        <Link href="/">Home</Link>
        <Link href="/about">About </Link>
      </ul>
      {!session && <Signin />}
      {session && <ProfileImg user={session.user} />}
    </nav>
  );
}

export default Nav;
