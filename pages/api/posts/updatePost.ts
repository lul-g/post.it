import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";
import { useSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "PUT") {
    // const { data: session } = useSession();
    const session = await getServerSession(req, res, authOptions);
    // const session = await getServerSession(req);
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please sign to make to a post.", icon: "❌" });
    }

    const postId = req.body.data.postId;
    const title = req.body.data.title;

    if (title.length > 300)
      return res.status(403).json({
        message: "Ain't no one got space for that.",
        icon: "❌",
      });

    if (!title.trim().length)
      return res.status(403).json({
        message: "Nope, no blanks!",
        icon: "😑",
      });

    try {
      const result = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          title,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({
        message: "Error has occured.",
        icon: "❌",
      });
    }
  }
}
