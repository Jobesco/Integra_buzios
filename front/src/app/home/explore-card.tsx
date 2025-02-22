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
import { useContext, useEffect, useState } from "react"
import { CalendarDays } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import SelectedCategoryContext from "@/lib/context"
import { fetchFromAreas } from "../api/papers"

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

export function ExploreCard(props: any) {
  const searchParams = useSearchParams()
  const router = useRouter()

  function handleClick() {
    const params = new URLSearchParams(searchParams)
    params.set('id', String(props.id))
    router.push(`/view?${params.toString()}`)
  }

  return (
    <Card className="box-border w-min-[230px] 
      w-full rounded-2xl flex flex-col text-left py-4 px-9
      cursor-pointer border-2 border-orangeBorder
      hover:border-selectedBorder hover:bg-selectedBorderOpaque
      text-grey2Full"
      onClick={handleClick}
    >
      <CardHeader className="m-0 p-0">
        <CardTitle className="p-0 m-0 text-xl/6 truncate 
          line-clamp-2 text-wrap">
          {props.title}
        </CardTitle>
        <div className="flex flex-row gap-2 p-0 m-0 text-grey3 
            text-md line-clamp-1 truncate">
          {props.keywords?.map(({ keyword }, index: number) => {
            return <p className="text-grey2 bg-homeBg px-3
                rounded-lg border-selectedBorderOpaque
                hover:border-selectedBorder" key={index}>
              {fixTitle(keyword.name)}
            </p>
          })}
        </div>
      </CardHeader>
      <CardFooter className="self-end w-full items-end p-0 gap-2
            flex-col items-start">
        <p className="line-clamp-2 text-grey2 font-bold">
          <span className=" text-black">Por: </span>
          {props.authors?.map(({ collaborator }, index: number) => collaborator.name +
            (props.authors.length > 1 && index != props.authors.length - 1 ? ', ' : ''))}
        </p>
        {props.abstract ?
          <p className="line-clamp-2 text-grey2 font-bold">
            <span className="text-black">Resumo: </span>
            {props.description}
          </p>
          : <></>}
        <div className="flex flex-row items-center font-bold">
          <CalendarDays size={18} color="#666666" />
          <p className="ml-2 text-grey2">{props.date}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function ExploreCardPage() {
  const { selectedCategory } = useContext(SelectedCategoryContext)
  const [explore, setExplore] = useState([])

  useEffect(() => {
    fetchFromAreas(selectedCategory).then((data) => {
      setExplore(data.slice(0, 6))
    })
  }, [selectedCategory])

  // TODO use resizable and remove slice for dynamic sizes
  return (
    <div className="grid grid-cols-2 gap-2 mb-24">
      {explore?.map((paper: any, index: number) =>
        <ExploreCard key={index} title={paper.title} id={paper.id}
          keywords={paper.keywords} description={paper.description}
          paper={paper} authors={paper.authors} date={paper.publication_year}
        />
      )}
    </div>
  )
}