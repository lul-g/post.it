import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    // const { data: session } = useSession();
    const session = await getServerSession(req, res, authOptions);
    // const session = await getServerSession(req);
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session?.user?.email!,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error getting user." });
    }
  }
}
