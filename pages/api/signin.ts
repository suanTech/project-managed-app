import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";
import {serialize} from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const user = await db.user.findUnique({
        where: {
          email: req.body.email
        }
      })
      if(!user) res.status(401).json({error: "Invalid Login"});
      else {
        const valid = await comparePasswords(req.body.password, user.password)
        if(!valid) res.status(401).json({error: "Invalid Password"})
        const jwt = await createJWT(user);
        res.setHeader(
          "Set-Cookie",
          serialize(process.env.COOKIE_NAME, jwt, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          })
        ).status(201).end();
      }
    } catch(err) {
      res.status(401).json({err: "Error has occured while processing your request"})
    }
  }
}
