import Image from "next/image";
import { BsVectorPen } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import EditModal from "./EditModal";
import VerifyDelete from "./VerifyDelete";
import { JSXElementConstructor, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type PostType = {
  title: string;
  postId: string;
  userId: string;
  img: string;
  name: string;
};

function Post({ postId, userId, img, name, title }: PostType) {
  const [showEditor, setShowEditor] = useState(false);
  const [showDeleter, setShowDeleter] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete(`/api/posts/deletePost`, { data: id }),
    {
      onError: (err) => {
        console.log("delete err");
        toast.success("Could not delete post");
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries();
        toast.success("Post has been deleted.");
      },
    }
  );
  const deletePost = () => {
    // deleteToastID = toast.loading("Deleting your post.", { id: deleteToastID });
    mutate(postId);
  };
  return (
    <>
      <div className="p-6 bg-white rounded-md w-[95%] my-2 shadow-[0_0_.1rem_0_black]">
        <div className="flex gap-2 items-center">
          <Image
            src={img}
            width={30}
            height={30}
            alt="profile image of post owner"
            className="rounded-full"
          />
          <h1 className="text-black font-bold">{name}</h1>
        </div>
        <h1 className="text-black mt-4 mb-2 text-sm">{title}</h1>
        <div className="flex items-center justify-between  mt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setShowEditor(true);
              }}
              className="font-mono font-bold p-2 rounded-md flex items-center gap-2 text-teal-400 bg-slate-800 hover:bg-slate-700"
            >
              <BsVectorPen size={20} />
            </button>
            <button
              onClick={() => {
                setShowDeleter(true);
              }}
              className="font-mono font-bold p-2 rounded-md flex items-center gap-2 text-red-400 bg-slate-800 hover:bg-slate-700 "
            >
              <FaTrashAlt size={20} />
            </button>
          </div>
        </div>
      </div>
      {showEditor && (
        <EditModal
          postId={postId}
          userId={userId}
          name={name}
          title={title}
          img={img}
          setter={setShowEditor}
        />
      )}
      {showDeleter && <VerifyDelete setter={setShowDeleter} del={deletePost} />}
    </>
  );
}

export default Post;
