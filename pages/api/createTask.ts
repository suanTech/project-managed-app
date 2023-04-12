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
      console.log(req.body)
      const result = await db.task.create({
        data: {
          name: req.body.task.name,
          description: req.body.task.description,
          due: new Date(req.body.task.due),
          ownerId: user.id,
          projectId: req.body.id
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({err: "Couldn't complete the request"})
    }
  }
}
