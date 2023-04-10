import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { validateJWT } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]!);

    try {
      const result = await db.project.create({
        data: {
          name: req.body.name,
          ownerId: user.id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({err: "Couldn't complete the request"})
    }
  }
}
