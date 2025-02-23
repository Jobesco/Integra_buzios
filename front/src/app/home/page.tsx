import Link from "next/link"

import { Separator } from "@/components/ui/separator"


import { Suspense } from "react"
import Dialogger from "./dialogger"
import ExploreCardPage from "./explore-card"

export default async function Home() {


  return (
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


        </div>

        <div className="w-full h-[924px] flex flex-col justify-start
        bg-white pt-20 px-28 gap-8">
          <div className="w-full">
            <p className="text-black font-bold text-2xl mr-auto">Explorar Áreas de Pesquisa</p>
            <Separator className="flex bg-black mt-5 w-full" />
          </div>


          <Suspense fallback={<p>Carregando...</p>}>
            <ExploreCardPage />
          </Suspense>
        </div>
      </div>

  )
}