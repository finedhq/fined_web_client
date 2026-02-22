import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import jwt from "jsonwebtoken";

export async function GET() {
  const session = await auth0.getSession();

  if (!session?.tokenSet?.idToken) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }

  const decoded = jwt.decode(
    session.tokenSet.idToken
  ) as any;
  console.log(decoded);
  const roles =
    decoded?.["https://myfined.com/roles"] || [];

  const newUser =
    decoded?.["https://myfined.com/newUser"] ?? false;

  return NextResponse.json({
    authenticated: true,
    roles,
    newUser
  });
}
