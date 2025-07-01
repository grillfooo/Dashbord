// app/login/page.tsx
"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

export default function Login() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
    if (res.ok) router.push("/dashboard")
  }

  return (
    <div className="max-w-sm mx-auto mt-24">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Email" {...register("email")} />
        <Input placeholder="Password" type="password" {...register("password")} />
        <Button className="w-full" type="submit">Login</Button>
      </form>
    </div>
  )
}
