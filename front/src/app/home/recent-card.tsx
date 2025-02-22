'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark } from "lucide-react"
import Link from "next/link"
import { fixDate, fixName, getInitials } from "@/lib/utils";
import { fixTitle } from "@/lib/utils"
import { useState, useEffect } from "react"
import { CalendarDays } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

function Keyword({ title, ...props }: {
  title: string
}) {

  return (
    <Button className="h-full py-2 px-4 text-grey font-normal text-md 
      bg-catButton hover:bg-grey3">
      {fixTitle(title)}
    </Button>
  )
}

export function RecentCard(props: any) {
  const searchParams = useSearchParams()
  const router = useRouter()

  function handleClick() {
    const params = new URLSearchParams(searchParams)
    params.set('id', String(props.id))
    router.push(`/view?${params.toString()}`)
  }

  return (
    <Card className="sm:col-span-2 box-border lg:h-[200px] w-min-[530px] 
      w-full rounded-2xl flex flex-col text-left py-4 px-9
      justify-between cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader className="m-0 p-0 mb-auto">
        <CardTitle className="p-0 m-0 text-xl/10 truncate line-clamp-1 text-wrap">{props.title}</CardTitle>
        <CardDescription className="p-0 m-0 text-grey3 w-full 
            text-md flex flex-row gap-1">
          {props.keywords.map((keyword, index: number) => {
            return <span className="text-grey2 bg-homeBg px-3
                rounded-lg" key={index}>
              {keyword.name}
            </span>
          })}
        </CardDescription>
      </CardHeader>
      <CardFooter className="self-end w-full items-end p-0 gap-2
            flex-col items-start">
        <p className="line-clamp-2 text-grey2 font-bold">
          <span className=" text-black">Por: </span>
          {props.authors?.map(({ collaborator }, index: number) => collaborator.name +
            (props.authors.length > 1 && index != props.authors.length - 1 ? ', ' : ''))}
        </p>
        <div className="flex flex-row items-center font-bold">
          <CalendarDays size={18} color="#666666" />
          <p className="ml-2 text-grey2">{props.date}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function RecentCardPage({ recent }: { recent: any[] }) {
  const [recent2, setRecent] = useState<Object[]>([])
  const [authors, setAuthors] = useState<string[]>([])

  useEffect(() => {
    setRecent(recent)
  }, [recent])

  return (
    <div className="flex flex-row justify-between gap-8 mb-24">
      {recent2?.map((paper: any, index: number) =>
        <RecentCard key={index} title={paper.title} id={paper.id}
          keywords={paper.keywords} description={paper.description}
          paper={paper} authors={paper.authors} date={paper.publication_year}
        />
      )}
    </div>
  )
}