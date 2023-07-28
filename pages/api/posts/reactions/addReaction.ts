import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "../../../../prisma/client";
import { useSession } from "next-auth/react";

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
        .json({ message: "Please sign to react to a post.", icon: "❌" });
    }
    const rxn = req.body.rxn; //poop | fire
    const postId = req.body.postId; //poop | fire
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });

    try {
      if (rxn == "fire") {
        const result = await prisma.fire.create({
          data: {
            postId,
            userId: user?.id!,
          },
        });
        res.status(200).json(result);
      } else {
        const result = await prisma.poop.create({
          data: {
            postId,
            userId: user?.id!,
          },
        });
        res.status(200).json(result);
      }
    } catch (err) {
      res.status(403).json({
        message: "Error has occured.",
        icon: "❌",
      });
    }
  }
}
