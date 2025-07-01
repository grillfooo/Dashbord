// app/api/auth/login/route.ts
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongo"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 })

  await connectToDB()
  const user = await User.findOne({ email })
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" })

  const res = NextResponse.json({ message: "Login successful" })
  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })

  return res
}
