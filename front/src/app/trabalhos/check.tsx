'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Check() {
  const [checked, setCheck] = useState<boolean>(false)

  function toggle() {
    setCheck(check => !check)
  }

  return (
    <Button className="h-10 aspect-square bg-lightGrey rounded-md border-none
      hover:bg-lightGrey p-1" onClick={toggle}>
      {checked ? <div className="aspect-square h-full bg-orange rounded-md"></div> : <></>}
    </Button>
  )
}