import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const url = req.nextUrl.clone()

  if (!token) {
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }
console.log("JWT_SECRET:", process.env.JWT_SECRET) // undefined in Edge Runtime
  // Do NOT verify JWT here (Edge Runtime can't handle it securely)
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
