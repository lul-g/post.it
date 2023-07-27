"use client";
import React from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
type User = {
  name: string;
  email: string;
  image: string;
};
type UserProps = {
  user: User;
};
function ProfileImg({ user }: UserProps) {
  return (
    <Link
      // href={`${
      //   user.email == "lulsegedgirma10@gmail.com" ||
      //   user.email == "lulsegedwork@gmail.com"
      //     ? "/dashboard/admin"
      //     : `dashboard/${user.name}`
      // }`}
      href={`/dashboard/${user.name.split(" ")[0]}`}
    >
      <div className="flex items-center gap-2 ">
        <Image
          className="rounded-full"
          src={user.image}
          alt="profile image"
          width={40}
          height={40}
        />
        {/* <span className="font-bold">{name}</span> */}
        <button
          className="font-bold py-1 px-3 rounded-md text-white bg-red-600 hover:bg-opacity-[.8] transition-all ease-out "
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    </Link>
  );
}

export default ProfileImg;
