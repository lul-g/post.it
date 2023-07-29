import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";
import { useSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    // @ts-ignore
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Please sign to make a post." });
    }

    const title: string = req.body.title!;
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });

    if (title.length > 300)
      return res.status(403).json({
        message: "Ain't no one got space for that.",
        icon: "❌",
      });

    if (!title.trim().length)
      return res.status(403).json({
        message: "Nope, No blanks!",
        icon: "😑",
      });

    try {
      const result = await prisma.post.create({
        data: {
          title,
          publisherId: prismaUser?.id!,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res
        .status(403)
        .json({ err: "Error has occured whilst making a post to DB." });
    }
  }
}
