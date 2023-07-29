import React from "react";

function page() {
  return (
    <div className="h-full bg-slate-100 flex flex-col items-center p-5 gap-5">
      <span className="text-black text-center text-3xl font-bold p-5 rounded-lg bg-slate-300 h-fit">
        Its a posting app, go post stuff❗
      </span>
      <span className="text-black text-center text-2xl font-bold p-5 rounded-lg bg-slate-300 h-fit">
        Found a bug 🐞?{" "}
        <div className="flex flex-col gap-1">
          <a
            href="https://github.com/lul-g/post.it"
            target="_blank"
            className="underline capitalize text-blue-600"
          >
            submit a pull request
          </a>
          or
          <a
            href="https://discordapp.com/users/755193483660099716"
            target="_blank"
            className="underline capitalize text-blue-600"
          >
            let me know about it
          </a>
        </div>
      </span>
      <span className="text-black text-center text-2xl font-bold p-5 rounded-lg bg-slate-300 h-fit">
        Want to collab 🤜🤛 with me on future projects?{" "}
        <a
          href="https://discordapp.com/users/755193483660099716"
          target="_blank"
          className="underline capitalize text-blue-600"
        >
          Message me on discord
        </a>
      </span>
    </div>
  );
}

export default page;
