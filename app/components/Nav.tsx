"use client";

import React from "react";
import Link from "next/link";
import Signin from "./auth/Signin";
import ProfileImg from "./auth/ProfileImg";
import { useSession } from "next-auth/react";

function Nav() {
  const { data: session } = useSession();
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
      {session && (
        <ProfileImg
          image={session?.user!.image!}
          name={session?.user!.name!}
          email={session?.user!.email!}
        />
      )}
    </nav>
  );
}

export default Nav;
