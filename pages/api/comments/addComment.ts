import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    // @ts-ignore
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please sign to comment on posts." });
    }
    const postId: string = req.body.postId;
    const message: string = req.body.message;

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });
    if (message.length > 200)
      return res.status(403).json({
        message: "Ain't no one got space for that.",
        icon: "❌",
      });

    if (!message.trim().length)
      return res.status(403).json({
        message: "Nope, No blanks!",
        icon: "😑",
      });

    try {
      const result = await prisma.comment.create({
        data: {
          postId,
          userId: user?.id!,
          message,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res
        .status(403)
        .json({ err: "Error has occured whilst making a comment to DB." });
    }
  }
}
