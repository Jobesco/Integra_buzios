'use client'
import { Button } from "@/components/ui/button"
import { cn, fixName, getInitials } from "@/lib/utils"
import { Info, Download, CalendarDays, Eye } from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useState, useEffect } from "react"
import { fixTitle } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"


export default function PaperView({ title, description,
  profile_pic, authors, affiliation,
  ...props }: {
    title: string, description?: string, profile_pic?: string,
    authors: any[],
    affiliation?: string,
    [key: string]: any // ? this is SUPER useful
  }) {
  const [email, setEmail] = useState<string>('')
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    setDate(props.publication_year)
  }, [props])

  return (
    <div className="flex flex-col w-full h-min-[180px] gap-10 text-grey">
      <p className="w-full font-bold text-4xl text-wrap text-black">{title}</p>
      <div className="flex flex-col gap-5">

        {/* // ? Authors, Date, Place and Language */}
        <div className="text-grey5 inline-flex">
          <span className="mr-1"><b className="text-black mr-1">Por: </b>{
            authors.map(({ collaborator }, i) =>
              <span key={i} className="inline-flex items-center text-md">
                {collaborator.emails?.some((mail) => {
                  return mail?.includes('@cesar.school') ||
                    mail?.includes('@cesar.org.br')
                }) ? <span className="h-2 w-2 rounded-full 
                bg-orange inline-block mr-1" /> : <span className="h-2 w-2 rounded-full 
                bg-transparent inline-block mr-1" />}
                <span className="inline-block">{collaborator.name +
                  (authors.length > 1 && i != authors.length - 1 ?
                    ', ' : '.')}</span>
              </span>
            )
          }</span>
          <div className="inline-flex items-center gap-2">
            <Separator orientation="vertical" className="bg-grey5 h-4 ml-2" />
            <CalendarDays size={16} color="#666666" />
            <span className="mr-2">{date ?? "N/D"}</span>
            {/* // TODO set this when available */}
            {/* <p className="ml-2">{new Date(date).toLocaleDateString('pt-BR')}</p> */}
          </div>
          <div className="flex inline-flex gap-2 items-center">
            <Separator orientation="vertical" className="bg-grey5 h-4 ml-2" />
            <span className="mr-2">{props.language ? fixTitle(props.language) : "Idioma não informado"}</span>
          </div>
          <div className="inline-flex items-center gap-2">
            <Separator orientation="vertical" className="bg-grey5 h-4 ml-2" />
            <span className="mr-2">{props.place_of_publication ? fixTitle(props.place_of_publication) : "Local não informado"}</span>
          </div>
        </div>

        <div className="leading-6">
          <div className="text-grey5 text-md font-bold w-full
            items-center inline-flex justify-between">
            <p className="grow">Link do arquivo <Info className="inline mb-[4px]" size={12} color="#369FFF" />: <a className="text-blue hover:underline" href={props.external_url[0]}>{props.external_url[0] ?? "Link não disponibilizado"}</a></p>
            <><span className="ml-auto h-2 w-2 rounded-full bg-orange inline-block 
              mr-1" />
              <span className="inline-block">Colaboradores CESAR</span></>
          </div>

          <HoverCard>
            <HoverCardTrigger>
              <p className="text-grey3 text-md font-bold">
                DOI <Info className="inline mb-[4px]" size={12} color="#369FFF" />:{props.doi ?
                  <a href={`https://doi.org/${props.doi}`}
                    target="_blank" rel="noopener noreferrer" className={
                      cn("font-bold font-normal", props.doi &&
                        "text-blue hover:underline")
                    }
                  >{`https://doi.org/${props.doi}`}</a>

                  : <span className="font-normal">Informação não disponível.</span>}
              </p>
            </HoverCardTrigger>
            <HoverCardContent>
              O Digital object identifier é um padrão para identificação de documentos em redes de computadores, como a Internet.
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger>
              <p className="text-grey3 text-md font-bold">
                ISSN <Info className="inline mb-[4px]" size={12} color="#369FFF" />: {props.issn ?
                  <span className="font-normal">{props.issn}</span>
                  : <span className={cn("font-normal")}>ISSN não providenciado</span>
                }
              </p>
            </HoverCardTrigger>
            <HoverCardContent>
              O ISSN, Número Internacional Normalizado para Publicações Seriadas ou Número Internacional Normalizado das Publicações em Série, é um Número serial de oito dígitos, usado para identificação única de uma publicação em série, aceite internacionalmente
            </HoverCardContent>
          </HoverCard>

          <p className="text-grey3 text-md font-bold">
            Tipo de Produção:
            <span className="font-normal text-grey3">{
              props.type.type ? fixTitle(props.type.type)
                : "Tipo não informado"
            }
            </span>
          </p>
          <p className="text-grey3 text-md font-bold">Área: <span className="font-normal text-grey3">
            {props.area ? fixTitle(props.area) : "Área não informada"}
          </span></p>
        </div>


      </div>
      <div className="flex-col items-start justify-start">
        <p className="text-grey3 font-bold text-lg">Resumo:</p>
        <p className="text-grey3 font-normal text-md text-wrap w-full">
          {props.abstract ?? "Resumo não informado."}
        </p>
      </div>
      <div className="flex-col items-start justify-start">
        <p className="text-grey3 font-bold text-lg">Notas:</p>
        <p className="text-grey3 font-normal text-md text-wrap w-full">
          {props.notes ?? "Notas não informadas."}
        </p>
      </div>

      <div className="inline-flex gap-5 justify-start">
        <HoverCard>
          <HoverCardTrigger>
            <Button className="w-72 h-14 justify-center items-center gap-3
              rounded-full bg-transparent border-orange hover:bg-orange text-black text-orange
              text-md hover:text-white border-[1px]" disabled={true}
            >
              <Eye color="#FF6002" />
              Visualizar
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            Em Breve!
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <Button className="w-72 h-14 justify-center items-center gap-3
              rounded-full bg-orange hover:bg-darkOrange text-black text-white
              text-md hover:border-[1px]" disabled
            >
              <Download color="#FFFFFF" />
              Baixar
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            Em Breve!
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  )
}