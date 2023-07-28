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
    // const { data: session } = useSession();
    const session = await getServerSession(req, res, authOptions);
    // const session = await getServerSession(req);
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please sign in to visit your dashboard." });
    }

    try {
      const result = await prisma.user.findUnique({
        where: {
          email: session?.user?.email!,
        },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              comments: true,
            },
          },
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error has occured whilst getting posts." });
    }
  }
}
