import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const url = req.nextUrl.clone()

  if (!token) {
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }
  // Do NOT verify JWT here (Edge Runtime can't handle it securely)
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
