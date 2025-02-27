'use client'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import grafico from "@/public/adm/graficop.svg"
import escudo from "@/public/adm/escudo.svg"
import faq from "@/public/adm/faq.svg"
import pasta from "@/public/adm/pasta.svg"
import pessoa from "@/public/adm/pessoa.svg"
import prancheta from "@/public/adm/prancheta.svg"
import {useRouter} from "next/navigation"


export default function Dashboard() {
  const {push} = useRouter()

  // TODO histórico!!!!! só não tem aqui!!

  return (
    <div className="container bg-background h-full mt-32
      flex flex-col items-start justify-start gap-8 text-4xl">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight 
        lg:text-5xl text-left mb-4">
        Painel de controle
      </h1>

      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-center 
          w-full p-4 bg-gray-200">
          <h2>Meus eventos</h2>
          <Button className="bg-primary900 text-background px-14 py-2 
            rounded-full" onClick={() => push('/adm/event/new')}>
            Criar novo evento
          </Button>
        </div>

        <ScrollArea className="overflow-y-auto max-h-[264px]">
          <div className="pr-4 flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex justify-between 
                items-center px-2 py-3 bg-surface rounded-xl text-sm">
                <span className="px-3 flex flex-col justify-between gap">
                  <span>Título {index + 1}</span>
                  <span className="text-xs">Evento {index + 1}</span>
                </span>
                <Button className="bg-primary900 text-background 
                  px-10 py-1 h-9 rounded-full">Gerenciar</Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="w-full flex flex-col gap-4">
        <h2>Gerenciamento de projeto</h2>
        <div className="grid grid-cols-3 gap-4">
          <Button asChild>
            <div className="flex justify-between 
              items-center px-2 py-3 bg-surface rounded-xl text-sm hover:cursor-pointer">
              <span className="px-3 flex gap-1
                text-primary">
                <Image unoptimized width="20" height="20" src={prancheta} alt="Gerenciar atividades" />
                <span className="text-onSurface">Gerenciar atividades</span>
              </span>
              
            </div>
          </Button>

          <Button asChild>
            <div className="flex justify-between 
              items-center px-2 py-3 bg-surface rounded-xl text-sm hover:cursor-pointer">
              <span className="px-3 flex gap-1
                text-primary">
                <Image unoptimized width="20" height="20" src={pasta} alt="Gerenciar atividades" />
                <span className="text-onSurface">Editar gerências</span>
              </span>
            </div>
          </Button>

          <Button asChild>
            <div className="flex justify-between 
              items-center px-2 py-3 bg-surface rounded-xl text-sm hover:cursor-pointer">
              <span className="px-3 flex gap-1
                text-primary">
                <Image unoptimized width="20" height="20" src={pessoa} alt="Gerenciar atividades" />
                <span className="text-onSurface">Gerenciar contas</span>
              </span>
            </div>
          </Button>

          <Button asChild>
            <div className="flex justify-between 
              items-center px-2 py-3 bg-surface rounded-xl text-sm hover:cursor-pointer">
              <span className="px-3 flex gap-1
                text-primary">
                <Image unoptimized width="20" height="20" src={grafico} alt="Gerenciar atividades" />
                <span className="text-onSurface">Dados do projeto</span>
              </span>
            </div>
          </Button>

          <Button asChild>
            <div className="flex justify-between 
              items-center px-2 py-3 bg-surface rounded-xl text-sm hover:cursor-pointer">
              <span className="px-3 flex gap-1
                text-primary">
                <Image unoptimized width="20" height="20" src={escudo} alt="Gerenciar atividades" />
                <span className="text-onSurface">Gerenciar administradores</span>
              </span>
            </div>
          </Button>

          <Button asChild>
            <div className="flex justify-between 
              items-center px-2 py-3 bg-surface rounded-xl text-sm hover:cursor-pointer">
              <span className="px-3 flex gap-1
                text-primary">
                <Image unoptimized width="20" height="20" src={faq} alt="Gerenciar atividades" />
                <span className="text-onSurface">Editar FAQ</span>
              </span>
            </div>
          </Button>
        </div>
      </div>
    
    </div>
  )
}