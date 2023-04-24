import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      console.log(req.body)
      const result = await db.task.update({
        where: {
          id: req.body.taskId,
        },
        data: {
          name: req.body.task.name,
          description: req.body.task.description,
          due: new Date(req.body.task.due),
          status: req.body.task.status,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({err: "Couldn't complete the request"})
    }
  }
}
