'use client'
import clsx from 'clsx'; // para mesclar classes
import { Montserrat } from 'next/font/google';

import { Button } from "@/components/ui/button";
import { AlarmClock, MapPin, User } from "lucide-react";
import ic_guide from "@/public/guide.svg"
import ic_loc from "@/public/locale.svg"
import ic_clock from "@/public/clock.svg"

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
import Image from "next/image";
import img from "@/public/aspas.svg"
import ModalCancel from './cancelar';

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

export function DetailsComponent(props: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleClick() {

    }

    function verDetalhes() {

    }
  
    return (
        
        <>
        {/* Caminho da Página */}
      <p className="text-sm text-gray-600 mt-2">
        <span>Página Inicial</span> <span className="text-blue-600 font-semibold"> &gt; {props.title}</span>
      </p>

      {/* Layout em Duas Colunas */}
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        {/* Coluna Esquerda - Texto e Detalhes */}
        <div>
          <h1 className={`${montserrat.className} text-3xl font-bold`}><strong>{props.title}</strong></h1>
          <p className="mt-4 text-gray-700">{props.details}</p>

          {/* Intensidade da Atividade */}
          <h2 className="mt-6 text-xl font-bold">Intensidade da Atividade</h2>
          <p className="text-gray-700">
            {props.intensidade}
          </p>

          {/* Botão de Ver Mais Detalhes */}
          <Button onClick={()=>verDetalhes()}
          className="bg-[#0E39F7] !text-white hover:!bg-transparent rounded-full px-6 py-2 mt-10 transition-colors duration-300">
            Ver mais detalhes
          </Button>
        </div>

        {/* Coluna Direita - Informações e Botões */}
        <div>
          {/* Informações do Evento */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className={`${montserrat.className} text-2xl font-bold`}>{props.date}</h2>
            <div className="mt-2 space-y-2">
              <p className="flex items-center gap-2">
                <Image className=" mr-2" src={ic_clock} alt="Local" width={16} height={16} />
                <span className="font-semibold">Horário:</span> {props.time}
              </p>
              <p className="flex items-center gap-2">
                <Image className=" mr-2" src={ic_loc} alt="Local" width={16} height={16} />
                <span className="font-semibold">Local:</span> {props.locale}
              </p>
              <p className="flex items-center gap-2">
                <Image className=" mr-2" src={ic_guide} alt="Local" width={16} height={16} />
                <span className="font-semibold">Guia Voluntário:</span> {props.guide}
              </p>
            </div>
          </div>

          {/* Botões de Inscrição - Empilhados */}
          <div className="mt-6 flex flex-col gap-4">
            <Button className="bg-success !text-white hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
            onClick={()=> handleClick()}>
              Confirmar Inscrição
            </Button>
            <Button onClick={() => setIsModalOpen(true)} variant="outline"  className="border-error text-error px-6 py-3 rounded-full hover:bg-red-50">
              ✖ Cancelar Inscrição
            </Button>
          </div>

          <div className="p-10">        
            <ModalCancel
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Vamos sentir sua falta..."
                description="Você realmente deseja cancelar sua inscrição nesta atividade?"
                confirmText="Cancelar inscrição"
                cancelText="Ainda quero participar"
                onConfirm={() => {
                alert("Ação confirmada!");
                setIsModalOpen(false);
                }}
            />
        </div>
        </div>
      </div>
</>

    );
  }

export default function ShowDetailsComponent() {

  return (
    <div >
        <DetailsComponent
        title="Rappel de Santa Tereza"
        details={`Sinta a adrenalina e a emoção enquanto desafia a gravidade em uma descida incrível pelas imponentes paredes da Serra Alta! Nossa atividade de rapel oferece uma experiência segura e emocionante para aventureiros de todos os níveis, desde iniciantes até os mais experientes.
            Em contato com a natureza exuberante do morro de Santa Tereza, tenha a experiência de conhecer um dos pontos turísticos do Rio enquanto desfruta de uma visão exclusiva do morro do Pão de Açúcar.
            `}
        intensidade="Essa atividade é considerada de médio-alto impacto e necessita de força moderada nos membros superiores e inferiores."
        date="14 de Janeiro"
        time="13h00"
        locale="Santa Tereza"
        guide="João Grilo"
        />
  </div>


  )
}