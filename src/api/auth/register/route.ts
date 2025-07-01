// app/api/auth/register/route.ts
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDB } from "@/lib/mongo"
import User from "@/models/User"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 })

  await connectToDB()
  const userExists = await User.findOne({ email })
  if (userExists) return NextResponse.json({ error: "User already exists" }, { status: 409 })

  const hashedPassword = await bcrypt.hash(password, 10)
  await User.create({ email, password: hashedPassword })

  return NextResponse.json({ message: "User registered" }, { status: 201 })
}
