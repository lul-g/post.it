import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { useSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "DELETE") {
    // @ts-ignore
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please signin to react to posts." });
    }
    const postId: string = req.body.postId;
    const rxn = req.body.rxn; //poop | fire
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });

    let reactionToDelete;
    if (rxn == "fire") {
      reactionToDelete = await prisma.fire.findFirst({
        where: {
          userId: user!.id,
          postId: postId,
        },
      });
    } else {
      reactionToDelete = await prisma.poop.findFirst({
        where: {
          userId: user!.id,
          postId: postId,
        },
      });
    }
    try {
      if (rxn == "fire") {
        const data = await prisma.fire.delete({
          where: {
            id: reactionToDelete?.id,
          },
        });
        res.status(200).json(data);
      } else {
        const data = await prisma.poop.delete({
          where: {
            id: reactionToDelete?.id,
          },
        });
        res.status(200).json(data);
      }
    } catch (err) {
      res.status(403).json({ err: "Error deleting rxn." });
    }
  }
}
