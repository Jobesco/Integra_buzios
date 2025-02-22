'use client'
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Redirect() {
  const { push } = useRouter()
  const params = useSearchParams()

  useEffect(() => push('/'.concat(params.get('to') ?? 'login')), [])
  return <></>
}