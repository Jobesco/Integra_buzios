'use client'
import { Separator } from "@radix-ui/react-separator"
import React, { useContext, useEffect, useState } from "react"
import Check from "./check"
import { ArrowDown, ArrowUp, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageBar, PaperItem, SmallPageBar } from "./paperStuff"
import { ArrowUpDown } from "lucide-react"
import { HolderContext } from "@/lib/context"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

export default function PaperList({
  qParams, currentPage, totalPages, papers
}: Readonly<{
  qParams: Array<[name: string, value: string]>,
  currentPage: number,
  totalPages: number,
  papers: Array<{
    title: string
    abstract: string
    publication_year: any
    authors: Array<any>
  }>
}>) {
  const { holder } = useContext(HolderContext)
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const paramsOut = new URLSearchParams(searchParams)
  const [ascendent, setAscendent] = useState(
    paramsOut.get('inverse_order') == 'true')


  function changeOrder() {
    setAscendent(old => !old)
  }

  useEffect(() => {
    paramsOut.set('inverse_order', String(ascendent))
    replace(`${pathname}?${paramsOut}`)
  }, [ascendent])

  useEffect(() => {
    // console.log(qParams)
  }, [qParams])

  return (
    <div className="flex-1 flex flex-col w-3/4 max-w-full">
      <div className="mb-6 flex flex-row justify-between items-center">
        <div className="inline-flex items-center justify-between gap-16 text-sm
          text-grey2">
          {qParams.length != 0 &&
            <p className=""> Resultados de pesquisa para:
              {qParams.map(([name, value], index) =>
                <span className="ml-1 font-bold" key={index}>{
                  Object.getOwnPropertyNames(holder).includes(name) ?
                    holder[name] : value
                }{index != qParams.length - 1 && value != '0' && ', '}</span>
              )}
            </p>
          }
        </div>
        <div className="flex flex-row text-sm text-grey2 items-center gap-6">
          <div className="flex flex-row">
            <p className="font-bold ml-1">{currentPage}</p>
            <span className="ml-1">-</span>
            <p className="font-bold ml-1">{totalPages}</p>
          </div>
          <SmallPageBar currentPage={currentPage} totalPages={totalPages} />
        </div>


      </div>
      <Separator className="bg-grey h-[1px]" />
      <Button className="p-0 m-2 ml-auto text-grey3 bg-transparent 
        hover:bg-transparent hover:underline align-top gap-2"
        onClick={changeOrder}
      >
        {!ascendent ? <ArrowDown size={16} color="#3E3232BF" /> :
          <ArrowUp size={16} color="#3E3232BF" />}
        {!ascendent ? <p>Mais recentes</p> : <p>Mais antigas</p>}
      </Button>
      <div className="flex flex-col flex-1 justify-start items-start 
        gap-6 mb-10 w-full">
        {papers.length ? papers?.map((paper: any, index: number) =>
          <PaperItem key={index} id={paper.id} title={paper.title}
            description={paper.abstract}
            date={paper.publication_year}
            authors={paper.authors}
          />
        ) : <div className="mx-auto flex flex-col gap-5 text-grey6">
          <Image className="mx-auto" src="/no_results.png" alt="Não encontrado."
            width="158" height="164" />
          <p className="text-center text-xl font-bold">Não encontramos resultados para a sua busca. <br /> Verifique os filtros aplicados ou tente utilizar outros termos.</p>
        </div>}
        <PageBar currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  )
}

export function PaperListSkeleton() {
  return (
    <div className="w-full">Loading...</div>
  )
}