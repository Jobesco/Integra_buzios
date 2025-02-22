'use client'
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function BackButton({ ...props }) {
  const router = useRouter()

  function handleBack() {
    router.back()
  }

  return (
    <Button {...props} onClick={handleBack}>
      <ChevronLeft color="#F7580B" strokeWidth={2} size={32} />
    </Button>
  )
}