import bcrypt from 'bcrypt';
import {SignJWT, jwtVerify} from 'jose';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/app-render';
import { db } from './db';
export const hashPassword = (password:string) => bcrypt.hash(password, 10)
export const comparePasswords = (plainTextPassword:string, hashedPassword:string) => {
  return bcrypt.compare(plainTextPassword, hashedPassword);
}

interface User {
  id: string,
  email: string
}
export const createJWT = (user:User) => {
  const iat = Math.floor(Date.now() /1000);
  const exp = iat + 60 * 60 * 24 * 7;
  return new SignJWT({userData: {id: user.id, email: user.email}})
    .setProtectedHeader({alg: "HS256", typ: "JWT"})
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

export const validateJWT = async (jwt: string):Promise<any> => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  return payload.userData;
}

export const getUserFromCookie = async (cookies: RequestCookies | ReadonlyRequestCookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME)
  if(!jwt) {throw new Error("no jwt")}
  else {
    const {id} = await validateJWT(jwt.value);
    const user = await db.user.findUnique({
      where: {
        id: id as string
      },
    })
    return user;
  } 
}