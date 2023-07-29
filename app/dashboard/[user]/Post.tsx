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
import { motion } from "framer-motion";
import Link from "next/link";

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
  const fadeIn = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
      },
    },
  };
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="w-[95%] p-6 bg-white rounded-md my-2 shadow-[0_0_.1rem_0_black] relative"
    >
      <Link
        href={`/posts/${postId}`}
        className="absolute top-4 right-4 bg-slate-200 rounded-md p-2 font-bold hover:bg-slate-300 z-50 "
      >
        📌 Details
      </Link>
      <div>
        <div className="">
          <div className="flex gap-2 items-center w-full">
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
        {showDeleter && (
          <VerifyDelete setter={setShowDeleter} del={deletePost} />
        )}
        <div className="flex items-center justify-between  mt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowEditor(true);
              }}
              className="font-mono font-bold p-2 rounded-md flex items-center gap-2 text-teal-400 bg-slate-800 hover:bg-slate-700"
            >
              <BsVectorPen size={20} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowDeleter(true);
              }}
              className="font-mono font-bold p-2 rounded-md flex items-center gap-2 text-red-400 bg-slate-800 hover:bg-slate-700 "
            >
              <FaTrashAlt size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Post;
