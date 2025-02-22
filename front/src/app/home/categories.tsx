'use client'
import { useState, useEffect, useRef, useContext, HTMLAttributes } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import SelectedCategoryContext from "@/lib/context"
import { useRouter } from "next/navigation"

export interface categoryType {
  name: string,
  papers: any[],
  id: number
}

export interface paperType {
  name: string,
  categories: string[] | string,
  author: string,
  date: string,
  description: string
}

function PaperCat(props: any) {

  return (
    <div className="sm:col-span-2 lg:col-span-1 bg-transparent
      flex flex-col m-0 p-0 w-full h-40 items-start justify-start"
    >
      <div className="pb-4 inline-flex gap-4">{
        Array.isArray(props.categories) ?
          props.categories.map((category: string[], index: number) => {
            <div key={index} className="px-2 py-1 rounded-sm bg-[#F7F6E2] text-[#666666] text-xs">
              {category}
            </div>
          })
          : <div className="px-2 py-1 rounded-sm bg-[#F7F6E2] text-[#666666] text-xs">
            {props.categories}
          </div>
      }</div>
      <div className="font-bold text-lg/5 mb-5">{props.name}</div>
      <div className=" inline-flex gap-2
        text-[#777777] text-sm/3 mb-5
      ">
        <Avatar className="w-4 h-4">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>{props.author}</p>
        <CalendarDays size={14} color="#555555" strokeWidth={1.25} />
        <p>{new Date(props.date).toDateString()}</p>
      </div>
      <div className="text-[#555555] text-base w-full">{props.description}</div>
    </div>
  )
}


export function CategoryGrid(
  { categories }: { categories: string[] }) {

  const [papers, setPapers] = useState<paperType[]>([])

  useEffect(() => {
    // ? every item where its keyword is in categories
    setPapers([
      {
        name: 'Educação e Inteligência Artificial',
        categories: 'Design',
        author: 'Jessica Koli',
        date: Date(),
        description: 'Did you come here for something in particular or \
        just general Riker-bashing? And blowing into maximum warp'
      },
      {
        name: 'Educação e Inteligência Artificial',
        categories: 'Design',
        author: 'Jessica Koli',
        date: Date(),
        description: 'Did you come here for something in particular or \
        just general Riker-bashing? And blowing into maximum warp'
      },
      {
        name: 'Educação e Inteligência Artificial',
        categories: 'Educação',
        author: 'Jessica Koli',
        date: Date(),
        description: 'Did you come here for something in particular or \
        just general Riker-bashing? And blowing into maximum warp'
      },
      {
        name: 'Educação e Inteligência Artificial',
        categories: 'Educação',
        author: 'Jessica Koli',
        date: Date(),
        description: 'Did you come here for something in particular or \
        just general Riker-bashing? And blowing into maximum warp'
      },
      {
        name: 'Educação e Inteligência Artificial',
        categories: 'Educação',
        author: 'Jessica Koli',
        date: Date(),
        description: 'Did you come here for something in particular or \
        just general Riker-bashing? And blowing into maximum warp'
      },
      {
        name: 'Educação e Inteligência Artificial',
        categories: 'Educação',
        author: 'Jessica Koli',
        date: Date(),
        description: 'Did you come here for something in particular or \
        just general Riker-bashing? And blowing into maximum warp'
      }
    ])

    if (categories.length) {
      setPapers(papers.filter((paper) => {
        if (!Array.isArray(paper.categories))
          return categories.includes(paper.categories)
        else
          return paper.categories.some((category) =>
            categories.includes(category))
      }))
    }
  }, [])

  return (
    <div className="grid grid-cols-2 gap-x-28 gap-y-11">
      {papers.map((paper, index) =>
        <PaperCat key={index} name={paper.name} categories={paper.categories}
          date={paper.date} author={paper.author} description={paper.description}
        />
      )}
    </div>
  )
}

export default function CategoriesList<T extends HTMLAttributes<HTMLDivElement>>(
  { categories, className, ...props }: { categories: categoryType[] } & T) {
  const context = useContext(SelectedCategoryContext)
  if (!context) {
    throw new Error("CategoriesList deve ser usado dentro de um Provider")
  }
  const { selectedCategory, setSelectedCategory } = context


  const scrollRef = useRef<HTMLDivElement | null>(null)

  const scrollBy = (offset: number) => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" })
  }

  const toggleSelection = (categoryId: number) => {
    setSelectedCategory((prev) => {
      const updated = new Set(prev);
      if (updated.has(categoryId)) {
        updated.delete(categoryId);
      } else {
        updated.add(categoryId);
      }
      return updated;
    });
  };

  return (
    <div className={cn("rounded-xl p-2 gap-2 w-full flex flex-row items-center", className)}>
      <Button onClick={() => scrollBy(-950)} className="bg-white 
      rounded-2xl hover:bg-orange"><ChevronLeft color="#3E3232"
          className="hover:text-white" /></Button>
      <ScrollArea viewportRef={scrollRef} className="w-full
        overflow-x-auto whitespace-nowrap"
      >
        <div className="flex flex-row gap-6">
          {categories.map((category, i) => (
            // TODO fix overflow
            <Toggle key={i} pressed={selectedCategory.has(category.id)}
              onPressedChange={press => toggleSelection(category.id)}
              className={cn("overflow-hidden w-44 px-auto py-auto \
                rounded-xl text-black font-black text-md bg-white \
                hover:text-white hover:bg-orange h-14 \
                line-clamp-2 text-wrap",
                selectedCategory.has(category.id) &&
                "data-[state=on]:bg-orange data-[state=on]:text-white"
              )}>
              {category.name}
            </Toggle>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="opacity-0 hover:opacity-0" />
      </ScrollArea>
      <Button onClick={() => scrollBy(950)} className="bg-white 
      rounded-2xl hover:bg-orange"><ChevronRight color="#3E3232"
          className="hover:text-white" /></Button>
    </div>
  )
}

export function TendenciesList<T extends HTMLAttributes<HTMLDivElement>>(
  { categories, className, ...props }: { categories: categoryType[] } & T) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { replace } = useRouter()

  const scrollBy = (offset: number) => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" })
  }

  const selectTendency = (categoryId: number) => {
    replace(`/trabalhos?page=1&keyword=${categoryId}`)
  };

  return (
    <div className={cn("rounded-xl p-2 gap-2 w-full flex flex-row items-center", className)}>
      <Button onClick={() => scrollBy(-950)} className="bg-white 
      rounded-2xl hover:bg-orange"><ChevronLeft color="#3E3232"
          className="hover:text-white" /></Button>
      <ScrollArea viewportRef={scrollRef} className="w-full
        overflow-x-auto whitespace-nowrap"
      >
        <div className="flex flex-row gap-6">
          {categories.map((category, i) => (
            // TODO fix overflow
            <Button key={i}
              onClick={() => selectTendency(category.id)}
              className={cn("overflow-hidden w-44 px-auto py-auto \
                rounded-xl text-black font-black text-md bg-white \
                hover:text-white hover:bg-orange h-14 \
                line-clamp-2 text-wrap")}>
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="opacity-0 hover:opacity-0" />
      </ScrollArea>
      <Button onClick={() => scrollBy(950)} className="bg-white 
      rounded-2xl hover:bg-orange"><ChevronRight color="#3E3232"
          className="hover:text-white" /></Button>
    </div>
  )
}