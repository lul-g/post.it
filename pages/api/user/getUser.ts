import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { getSession } from "next-auth/react";
// import { useSearchParams } from "next/navigation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const session = await getSession({ req });
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
