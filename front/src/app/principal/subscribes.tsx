'use client'
import { Button } from "@/components/ui/button"
import clsx from 'clsx'; // para mesclar classes
import { Montserrat } from 'next/font/google';
import {
  Card,
  CardContent
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
import Image from "next/image";
import ic_guide from "@/public/guide.svg"
import ic_loc from "@/public/locale.svg"

const montserrat = Montserrat({
    weight: ['400', '700', '800'], // Escolha os pesos que deseja utilizar
    subsets: ['latin'],
  });

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

export function SubsCard(props: any) {

    const searchParams = useSearchParams();
    const router = useRouter();
  
    return (
        <Card className="p-4 w-full rounded-2xl bg-gray-50 shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
        {props.title}</h3>

        <div className="flex flex-row my-4">
            <Image className=" mr-2" src={ic_loc} alt="Local" width={16} height={16} />
            <div className="flex flex-col">
                <strong className="text-sm/3">Local</strong> {/* Tamanho menor para "Status" */}
                <div className="flex items-center">
                    <p className="text-[12px] ">{props.location}</p>
                </div>
            </div>
        </div>

        <div className="flex flex-row">
            <Image className=" mr-2" src={ic_guide} alt="Local" width={16} height={16} />
            <div className="flex flex-col">
                <strong className="text-sm/3">Guia voluntário</strong> {/* Tamanho menor para "Status" */}
                <div className="flex items-center">
                    <p className="text-[12px] ">{props.guide}</p>
                </div>
            </div>
        </div>
        
      </div>
      <div className="text-right text-2xl font-bold text-gray-800">
        <p>{props.date.split(' ')[0]}</p>
        <p className="text-sm">{props.date.split(' ')[1]}</p>
        <br />
        <div className="flex flex-col">
            <strong className="text-sm/3">Status da inscrição</strong> {/* Tamanho menor para "Status" */}
            <div className="flex items-center">
                <span className="w-2 h-2 bg-[#1eff00] rounded-full mr-2"></span>
                <p className="text-[12px] ">{props.status}</p>
            </div>
        </div>
      </div>
    </Card>


    );
  }

export default function ShowSubsCard() {

    const inscricoes = [
        {
          title: "Rapel de Santa Tereza",
          location: "Morro da Urca",
          guide: "João Grilo",
          status: "Confirmado",
          date: "12 JAN"
        },
        {
            title: "Rapel de Santa Tereza",
            location: "Morro da Urca",
            guide: "João Grilo",
            status: "Confirmado",
            date: "12 JAN"
          },
          {
            title: "Rapel de Santa Tereza",
            location: "Morro da Urca",
            guide: "João Grilo",
            status: "Confirmado",
            date: "12 JAN"
          },
          {
            title: "Rapel de Santa Tereza",
            location: "Morro da Urca",
            guide: "João Grilo",
            status: "Confirmado",
            date: "12 JAN"
          },
          {
            title: "Rapel de Santa Tereza",
            location: "Morro da Urca",
            guide: "João Grilo",
            status: "Confirmado",
            date: "12 JAN"
          },
          {
            title: "Rapel de Santa Tereza",
            location: "Morro da Urca",
            guide: "João Grilo",
            status: "Confirmado",
            date: "12 JAN"
          },
          {
            title: "Rapel de Santa Tereza",
            location: "Morro da Urca",
            guide: "João Grilo",
            status: "Confirmado",
            date: "12 JAN"
          },
          {
            title: "Rapel de Santa Tereza",
            location: "Morro da Urca",
            guide: "João Grilo",
            status: "Confirmado",
            date: "12 JAN"
          },
          {
            title: "Rapel de Santa Tereza",
            location: "Morro da Urca",
            guide: "João Grilo",
            status: "Confirmado",
            date: "12 JAN"
          },
          {
            title: "Rapel de Santa Tereza",
            location: "Morro da Urca",
            guide: "João Grilo",
            status: "Confirmado",
            date: "12 JAN"
          },
        // Adicione mais inscrições aqui...
      ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

  {inscricoes.map((inscricao, index) => (
    <SubsCard
      key={index}
      title={inscricao.title}
      location={inscricao.location}
      guide={inscricao.guide}
      status={inscricao.status}
      date={inscricao.date}
    />
  ))}
</div>


  )
}