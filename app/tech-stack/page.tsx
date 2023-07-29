import React from "react";
import Image from "next/image";
function page() {
  return (
    <div className="h-full bg-slate-100 flex flex-col items-center p-5 gap-5">
      <span className="text-center text-3xl font-bold p-5 rounded-lg bg-white text-black h-fit">
        My tech stack this web app🙂
      </span>
      <div className="bg-gray-900 rounded-lg p-2">
        <Image
          priority
          src="/tech-stack.svg"
          width={300}
          height={300}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
}

export default page;
