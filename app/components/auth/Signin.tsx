"use client";

import { signIn } from "next-auth/react";
import React from "react";

function Signin() {
  return (
    <button
      className="font-bold py-1 px-3 rounded-md bg-white text-black border-2 hover:bg-gray-950 hover:text-white hover:border-white transition-all ease-out "
      onClick={() => signIn()}
    >
      Sign In
    </button>
  );
}

export default Signin;
