'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn, getInitials } from "@/lib/utils"

import { useEffect, useState } from "react"


export interface collabsType {
  id: number,
  name: string,
  count: number,
  pfp: string | undefined
}

export default function Highlight({ collabs }: { collabs: Array<collabsType> }) {
  const [collabsState, setCollabsState] = useState<typeof collabs>(collabs)

  useEffect(() => {
    console.log(collabs)
    setCollabsState(collabs)
  }, [collabs])

  return (
    <Carousel className="h-[439px] w-[650px] flex flex-row justify-center items-center" id="carousel">
      <CarouselContent className="gap-0 ml-0 flex flex-row justify-center items-center">
        {Array.from(collabsState).map(({ id, name, count, pfp }, index) => (
          <CarouselItem
            key={index}
            className={cn("flex justify-center items-center carouselItem basis-1/3",
              "bg-white -pl-4 rounded-full h-[305px] w-[305px]", index > 0 && index < 2
              ? 'z-1 bg-grey'
              : 'z-0 bg-white')}
          // height: index > 0 && index < 2 ? '305px' : '229px',
          // width: index > 0 && index < 2 ? '229px' : '171px'

          >
            <div className="w-full h-full object-cover rounded-lg shadow-lg justify-center items-center flex">{getInitials(name)} - {count}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="py-auto bg-white text-black" />
      <CarouselNext className="bg-white text-black" />
    </Carousel>
  )

  // return (
  //   <div className="flex flex-col w-full gap-8 items-center">
  //     <Avatar className="w-[290px] h-[290px]">
  //       <AvatarImage src="https://github.com/shadcn.png" />
  //       <AvatarFallback>CN</AvatarFallback>
  //     </Avatar>
  //   </div>
  // )
}