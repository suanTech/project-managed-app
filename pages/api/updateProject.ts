import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const result = await db.project.update({
        where: {
          id: req.body.projectId
        },
        data: {
          name: req.body.project.name,
          description: req.body.project.description,
          deleted: req.body.project.deleted,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({err: "Couldn't complete the request"})
    }
  }
}
