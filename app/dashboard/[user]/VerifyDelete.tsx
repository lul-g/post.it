"use client";

type Prop = {
  setter: (val: boolean) => void;
  del: () => void;
};
function VerifyDelete({ setter, del }: Prop) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-md w-[20rem] my-2 shadow-[0_0_.1rem_0_black] z-30">
        <button
          onClick={() => {
            setter(false);
          }}
          className="absolute right-2 top-2 bg-black text-white font-bold py-1 px-3 rounded-md hover:bg-opacity-80"
        >
          X
        </button>
        <div className="flex flex-col items-center justify-center gap-4 mt-4">
          <div>
            <p className="text-black font-bold text-center">
              This action will <span className="text-red-500">permanently</span>{" "}
              remove your post🤯
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              del();
              setter(false);
            }}
            className="font-bold py-1 px-3 rounded-md transition-all ease-out text-white bg-red-500 backdrop-blur-md"
          >
            That's exactly what I want
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyDelete;
