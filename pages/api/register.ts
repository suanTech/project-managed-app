import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";
import {serialize} from "cookie";

export default async function Register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const user = await db.user.create({
        data: {
          email: req.body.email,
          password: await hashPassword(req.body.password),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
      });
      const jwt = await createJWT(user);
      res
      .setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7
        })
      )
      .status(201).end();
    } catch(err) {
      res.status(403).json({err: "Error has occured while processing your request"})
    }
  } 
}
