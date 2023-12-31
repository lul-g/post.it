import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";
import { useSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    // @ts-ignore
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please sign in to visit your dashboard." });
    }

    try {
      const result = await prisma.post.findMany({
        where: {
          user: {
            email: session?.user?.email!,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          comments: true,
          user: true,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error has occured whilst getting posts." });
    }
  }
}
