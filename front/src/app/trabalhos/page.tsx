'use server'
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Busca from "./search"
import PaperList, { PaperListSkeleton } from "./list"
import { Suspense } from 'react';
import { fetchPapers, fetchTypes, fetchPlaces, fetchAreas, fetchKeywords } from "../api/papers";
import { HolderProvider } from "@/lib/provider"

export interface PaperProps {
  title: string,
  author?: string,
  profile_pic?: string,
  date?: Date,
  description?: string
}

export default async function Trabalhos({
  searchParams,
}: {
  searchParams?: {
    title?: string | undefined,
    author?: string | undefined,
    keyword?: string | undefined,
    type?: string | undefined,
    place?: string | undefined,
    area?: string | undefined,
    dateBegin?: string | undefined,
    dateEnd?: string | undefined,
    inverse_order?: string
    page: string
  }
}) {
  const title = searchParams?.title || undefined
  const author = searchParams?.author || undefined
  const keyword = searchParams?.keyword || undefined
  const type = searchParams?.type || undefined
  const place = searchParams?.place || undefined
  const area = searchParams?.area || undefined
  const dateBegin = searchParams?.dateBegin || undefined
  const dateEnd = searchParams?.dateBegin || undefined

  const currentPage = Number(searchParams?.page) || 1;

  // TODO lazy load these
  const [papersData, typeList, areaList, keywordList] = await Promise.all([
    fetchPapers(searchParams, currentPage),
    fetchTypes(),
    fetchAreas(),
    fetchKeywords(),
  ]);

  const [papers, totalPages] = papersData;

  const qparams = Object.entries({
    title: title,
    author: author,
    keyword: keyword,
    type: type,
    place: place,
    area: area,
    dateBegin: dateBegin,
    dateEnd: dateEnd,
  }).filter(([name, value]) => value != undefined)

  return (
    <HolderProvider>
      <div className="w-screen min-h-[1102px]">
        <div className="flex flex-col w-full px-[112px] min-h-[720px] max-w-screen">
          <div className="flex flex-col justify-start pt-8">
            <p className="text-orange font-black text-2xl self-start">Trabalhos</p>
            <div className="flex flex-row mt-5 mb-12 w-full">
              <Separator className="bg-orange w-28" />
              <Separator className="bg-primary flex-1" />
            </div>
          </div>

          <div className="flex w-full gap-7 justify-center items-start">
            <Busca types={typeList} areas={areaList}
              keywords={keywordList} />
            <Suspense fallback={<PaperListSkeleton />}>
              <PaperList qParams={qparams} currentPage={currentPage}
                totalPages={totalPages} papers={papers} />
            </Suspense>
          </div>
        </div>

      </div>
    </HolderProvider>
  )
}
