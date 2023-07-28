import React from "react";
import { cn } from "@/lib/utils";

function Spinner({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full",
        className
      )}
      role="status"
      aria-label="loading"
    ></div>
  );
}

export default Spinner;
