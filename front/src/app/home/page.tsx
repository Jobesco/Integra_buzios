import Link from "next/link"
import Image from "next/image"

import { CircleUser, EllipsisVertical, Search, ChevronDown, ChevronUp } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Sheet, SheetContent, SheetTrigger, SheetTitle,
  SheetDescription, SheetHeader
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"


import MostAccessedPage from "./most-accessed"
import RecentCardPage from "./recent-card"
import CategoriesList, { CategoryGrid, categoryType, TendenciesList } from "./categories"
import Highlight, { collabsType } from "./highlight"
import MiniSearch from "./mini-search"

import { fetchAreas, fetchTendencies, fetchRecent, fetchTypes, fetchKeywords } from "../api/papers"
import Dialogger from "./dialogger"
import ExploreCardPage from "./explore-card"

import { SelectedCategoryProvider, HolderProvider } from "@/lib/provider"
import { Suspense, useContext } from "react"
import { fetchTopContributors } from "../api/collabs"

export default async function Home() {
  const recent = (await fetchRecent())[0].slice(0, 2)
  const areas = (await fetchAreas()).map(area => ({
    name: area.area, papers: area.papers, id: area.id
  })).slice(0, 20)
  const tendencies = await fetchTendencies()
  const top_collabs = (await fetchTopContributors<collabsType>()).slice(0, 3)
  const typeList = await fetchTypes()
  const areaList = await fetchAreas()
  const keywordList = await fetchKeywords()

  return (
    <SelectedCategoryProvider ><HolderProvider>
      <div className="w-full flex flex-col">
        <div className="w-screen h-[440px] flex flex-col 
        justify-center align-center
        w-screen bg-[url('/dark_first.png')] 
        bg-no-repeat bg-right bg-cover"
        >
          <Dialogger />

          <h1 className="text-white text-center scroll-m-20 
          font-black tracking-tight lg:text-7xl">
            Bem vindo ao CESAR Research Hub
          </h1>
          <h4 className="[&:not(:first-child)]:mt-6
          tracking-tight text-white text-center lg:text-md
          font-normal">
            Explore, compartilhe e descubra os principais avanços nas áreas de ciência, tecnologia, design e inovação.<br />
            Aqui, pesquisadores, professores e estudantes conectam suas ideias com o mercado, criando soluções para os desafios atuais e <br />
            promovendo o desenvolvimento do conhecimento científico.
          </h4>

          <MiniSearch types={typeList} areas={areaList} keywords={keywordList}/>

        </div>

        <div className="w-full h-[315px] flex flex-col 
        justify-between
        bg-[url('/small.png')] 
        bg-no-repeat bg-center bg-cover pt-8 px-28"
        >
          <div>
            <div className="flex flex-row justify-between">
              <p className="text-black font-black text-2xl">Tendências de pesquisa</p>
              <Link href="trabalhos" className="text-orange font-black text-2xl
              underline">ver todas</Link>
            </div>

            <Separator className="w-full bg-primary mt-5" />
          </div>

          <TendenciesList className="mb-24 bg-homeBg" categories={tendencies} />

        </div>

        <div className="w-full h-[480px] flex flex-col
        justify-between
        bg-[url('/medium_bright.png')] 
        bg-no-repeat bg-center bg-cover pt-20 px-28"
        >
          <div>
            <div className="flex flex-row justify-between">
              <p className="text-white font-black text-2xl">Trabalhos Recentes</p>
              <Link href="trabalhos" className="text-white font-black text-2xl">ver todas</Link>
            </div>

            <Separator className="flex h-1 bg-white mt-5 w-full" />
          </div>

          <RecentCardPage recent={recent} />

        </div>

        <div className="w-full h-[924px] flex flex-col justify-start
        bg-white pt-20 px-28 gap-8">
          <div className="w-full">
            <p className="text-black font-bold text-2xl mr-auto">Explorar Áreas de Pesquisa</p>
            <Separator className="flex bg-black mt-5 w-full" />
          </div>


          <CategoriesList className="bg-lightGrey" categories={areas} />
          <Suspense fallback={<p>Carregando...</p>}>
            <ExploreCardPage />
          </Suspense>
        </div>

        {/* // TODO finish this */}
        {/* <div id="mainBox" className="w-full h-[753px] flex flex-col
          items-center justify-start bg-[url('/black.png')] 
          bg-no-repeat bg-center bg-cover pt-24 px-[290px] gap-5"
        >
          <p className="text-white text-center text-6xl">Destaque de <br />Publicações</p>
          <p className="text-white text-center text-lg max-w-[640px]">Os colaboradores que mais contribuíram para o avanço científico com suas publicações.</p>
          <Highlight collabs={top_collabs} />

        </div> */}

      </div>
    </HolderProvider></SelectedCategoryProvider>

  )
}