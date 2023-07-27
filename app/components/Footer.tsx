import React from "react";

function Footer() {
  return (
    <footer className="bg-white text-black text-center text-xl p-5 flex flex-col items-center justify-center gap-5 font-semibold">
      <div>
        ✨ Inspired by
        <a
          href="https://www.youtube.com/@developedbyed"
          className="text-blue-700 underline"
        >
          @developedbyed
        </a>
      </div>
      <div>
        📌 Developed by{" "}
        <a
          href="https://twitter.com/lulseged_admasu"
          className="text-blue-700 underline"
        >
          @Lul
        </a>
      </div>
    </footer>
  );
}

export default Footer;
