'use server'
import { cookies } from "next/headers"

export async function checkCookie(cookie: string) {
  const cooks = await cookies()
  return cooks.get(cookie).value
}
