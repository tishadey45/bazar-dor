import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

// এখানে function এর নাম 'proxy' দিতে হবে (Next.js এর নতুন রুল অনুযায়ী)
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/products/:path*","/products/:path*"],
};