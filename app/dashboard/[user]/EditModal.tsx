import { Textarea } from "@/app/components/textarea";
import Image from "next/image";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

type EditProps = {
  postId?: string;
  userId?: string;
  img?: string;
  name?: string;
  title?: string;
  setter: (val: boolean) => void;
  //   comments?: {
  //     id: string;
  //     postId: string;
  //     userId: string;
  //   }[];
};
function EditModal({ setter, img, name, title, userId, postId }: EditProps) {
  let queryClient = useQueryClient();
  const [stateTitle, setTitle] = useState(title);

  const updatePost = async () => {
    mutate(postId!);
  };
  const { mutate } = useMutation(
    async (postId: string) =>
      await axios.put(`/api/posts/updatePost`, {
        data: {
          title: stateTitle,
          postId,
        },
      }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, {
            icon: error?.response?.data.icon,
            style: {
              background: "#333",
              color: "#fff",
            },
          });
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries();
        toast.success("Post has been updated.");
      },
    }
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-40">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-md w-[28rem] my-2 shadow-[0_0_.1rem_0_black] z-30">
        <button
          onClick={(e) => {
            e.preventDefault();
            setter(false);
          }}
          className="absolute right-2 top-2 bg-black text-white font-bold py-1 px-3 rounded-md hover:bg-opacity-80"
        >
          X
        </button>
        <div className="flex gap-2 items-center mt-4">
          <Image
            src={img!}
            width={30}
            height={30}
            alt="profile image of post owner"
            className="rounded-full"
          />
          <h1 className="text-black font-bold">{name}</h1>
        </div>
        <form action="" className="my-4">
          <Textarea
            value={stateTitle}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            className="h-[5rem] bg-gray-200"
          />
        </form>
        <div>
          <p
            className={`font-bold ${
              stateTitle!.length > 300 ? "text-red-400" : ""
            }`}
          >
            {stateTitle!.length}/300
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                updatePost();
                setter(false);
              }}
              className="font-bold py-1 px-3 rounded-md text-white border-2 border-transparent bg-gray-950 transition-all ease-out hover:bg-gray-800 "
            >
              Save
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setter(false);
              }}
              className="font-bold py-1 px-3 rounded-md bg-gray-100 text-black border-2 hover:bg-gray-200  transition-all ease-out "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
