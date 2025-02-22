'use client'
import React, { useState } from "react"
import Check from "./check"
import { Upload, CalendarDays, ChevronDown, ChevronUp, ChevronRight } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { getInitials } from "@/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { cn } from "@/lib/utils"

export function PageBar({ currentPage, totalPages }:
  { currentPage: number, totalPages: number }) {
  const pages = []

  if (currentPage != 1)
    pages.push(String(Math.max(1, currentPage - 1)))
  pages.push(String(currentPage))
  if (currentPage != totalPages)
    pages.push(String(Math.min(totalPages, currentPage + 1)))

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <Pagination>
      <PaginationContent className="gap-3 h-12 ml-auto">
        <PaginationPrevious
          aria-disabled={currentPage === 1}
          href={createPageURL(Math.max(1, currentPage - 1))}
          className={cn("rounded-full px-[10px] py-2", currentPage === 1 ? "bg-grey4 pointer-events-none" : undefined)}
          customarrow={currentPage === 1 ? "#FFFFFF" : undefined}
        />
        {currentPage != 1 ? <PaginationEllipsis /> : <></>}
        {pages.map(page => (
          <PaginationItem key={page} className={cn("rounded-full", Number(page) === currentPage ?
            'bg-orange text-white hover:bg-grey4' : '')}>
            <PaginationLink href={createPageURL(page)} >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage != totalPages ? <PaginationEllipsis /> : <></>}
        <PaginationNext
          href={createPageURL(Math.min(totalPages, currentPage + 1))}
          aria-disabled={currentPage === totalPages}
          customarrow={currentPage === totalPages ? "#FFFFFF" : undefined}
          className={cn("rounded-full px-[10px] py-2", currentPage === totalPages ? "bg-grey4 pointer-events-none" : undefined)}
        />
      </PaginationContent>
    </Pagination>
  )
}

export function SmallPageBar({ currentPage, totalPages }:
  { currentPage: number, totalPages: number }) {
  const pages = []

  if (currentPage != 1)
    pages.push(String(Math.max(1, currentPage - 1)))
  pages.push(String(currentPage))
  if (currentPage != totalPages)
    pages.push(String(Math.min(totalPages, currentPage + 1)))

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          aria-disabled={currentPage === 1}
          href={createPageURL(Math.max(1, currentPage - 1))}
          customarrow="#FFFFFF"
          className={cn("rounded-2xl p-[12px] bg-orange font-bold", currentPage === 1 ? "bg-grey4 pointer-events-none" : undefined)}
        />
        <PaginationNext
          href={createPageURL(Math.min(totalPages, currentPage + 1))}
          aria-disabled={currentPage === totalPages}
          customarrow="#FFFFFF"
          className={cn("rounded-2xl p-[12px] bg-orange font-bold", currentPage === totalPages ? "bg-grey4 pointer-events-none" : undefined)}

        />
      </PaginationContent>
    </Pagination>
  )
}

export function PaperItem({ title, authors, date,
  description, id
}: {
  title: string, authors: any[], profile_pic?: string, date?: Date | string,
  description?: string, id: number
}) {
  const [open, setOpen] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  function handleClick() {
    const params = new URLSearchParams(searchParams)
    params.set('id', String(id))
    router.push(`/view?${params.toString()}`)
    // TODO back to trabalhos if it does not have an id on view
  }

  return (
    <Button onClick={handleClick}
      className="flex flex-row gap-3 bg-white text-black font-bold 
      text-lg text-left py-5 m-0 pb-1 pt-1 w-full h-full items-center
      bg-transparent hover:bg-highOrange">
      {/* <Check /> */}
      <div className="flex flex-col gap-2 grow max-w-full text-wrap">
        <p className="font-bold text-md mr-2 mb-2 line-clamp-2">
          {title}
        </p>
        <div className="flex flex-row gap-1 text-grey3 text-sm 
        align-start">
          <span className="font-bold text-black">Por:</span>
          <p className="line-clamp-1">
            {authors?.map((author: any, index: number) => author.collaborator.name +
              (authors.length > 1 && index != authors.length - 1 ? ', ' : ''))}
          </p>
        </div>
        {date ? <div className="flex flex-row gap-1 items-center text-grey3 text-sm">
          <CalendarDays size={14} color="#666666" />
          <p>{typeof date === 'string' ? date : date.toLocaleDateString()}</p>
        </div> : <></>}
        {description ? <div className="inline-flex gap-1">
          <span className="font-bold text-sm text-black">Resumo:</span>
          <p className="text-sm text-grey3 line-clamp-2">{description}</p>
        </div> : <></>}
      </div>
      <ChevronRight size={24} className="shrink-0" color="#000000" />
    </Button>
  )
}