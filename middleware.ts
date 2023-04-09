import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  return payload;
}
export default async function middleware(
  req: NextRequest,
  res: NextResponse
  ) {
    const {pathname} = req.nextUrl;
    if( 
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/static") ||
      pathname.startsWith("/signin") ||
      pathname.startsWith("/register") ||
      PUBLIC_FILE.test(pathname)
    ) {
      return NextResponse.next();
    }
    const jwt = req.cookies.get(process.env.COOKIE_NAME);
    if(!jwt) {
      req.nextUrl.pathname = "/signin";
      return NextResponse.redirect(req.nextUrl)
    } 
    try {
      await validateJWT(jwt.value);
      return NextResponse.next();
    } catch (err) {
      console.error(err);
      req.nextUrl.pathname = "/signin";
      return NextResponse.redirect(req.nextUrl);

    }

}
