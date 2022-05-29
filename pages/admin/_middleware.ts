import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwt } from "../../utils";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    const { origin, pathname } = req.nextUrl.clone();
    return NextResponse.redirect(`${origin}/auth/login?p=${pathname}`);
  }

  const validRoles = ["admin"];

  if (!validRoles.includes(session.user.role)) {
    const { origin, pathname } = req.nextUrl.clone();
    return NextResponse.redirect(origin);
  }

  return NextResponse.next();
}
