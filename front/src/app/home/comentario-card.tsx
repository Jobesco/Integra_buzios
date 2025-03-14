'use client'
import { Button } from "@/components/ui/button"
import clsx from 'clsx'; // para mesclar classes
import { Montserrat } from 'next/font/google';
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

export function ComentarioCard(props: any) {

    const textWithLineBreaks = props.text.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ));

    const searchParams = useSearchParams();
    const router = useRouter();
  
    function handleClick() {
        const params = new URLSearchParams(searchParams);
        params.set("id", String(props.id));
        router.push(`/view?${params.toString()}`); // Usando template literals
      }
  
    return (
        <Card
  className="bg-[#F0F0F0] min-w-[230px] w-full rounded-xl flex flex-col items-start text-left p-6 cursor-pointer"
>
  <div className="w-8 h-8 mb-4">
    <Image
      src={img}
      alt="Imagem do card"
      width={32}
      height={32}
      className="w-full h-full object-cover"
    />
  </div>

  <div className="flex flex-col gap-2 text-grey3 text-md">
    <p className="text-black bg-homeBg px-3 py-2 rounded-lg border-selectedBorderOpaque hover:border-selectedBorder whitespace-pre-line break-words">
      {textWithLineBreaks}
    </p>
  </div>
</Card>


    );
  }

export default function ShowComentarioCard() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ComentarioCard
    text="Participei do surf em dezembro de 2023. A princípio fiquei com receio por ser pesada, mas avisei antecipadamente ao instrutor, que me garantiu uma prancha adequada. Deu tudo certo e foi uma experiência maravilhosa! Tudo bem que o mar estava calminho, mas ainda assim, quem diria que no meu primeiro contato com o surf eu já conseguiria dropar?Agora estou morando perto da praia e pretendo começar a fazer aulas." />
  <ComentarioCard
    text="Foi muito bacana conhecer novos colegas de Búzios de áreas tão próximas e ao mesmo tempo tão distantes no dia-a-dia. Abraço a todos!"/>
  <ComentarioCard
       text= "Amei a iniciativa, que venham muitas integrações como esta pela frente!! Fiz o standup paddle e fiquei na vontade da aula de surf e do passeio gastronômico rs. Grata por conhecer novos colegas e o guia/tutor super bem humorado!"
  />
  <ComentarioCard
      text="Foi excelente! Rede de contatos atualizada com sucesso!!! E parabéns para a equipe da organização e os guias. Foi impecável! Sem contar que eu jamais iria sozinha fazer uma aula de surf e foi incrível!"
  />
  <ComentarioCard
    text ="Foi muito bacana conhecer novos colegas de Búzios de áreas tão próximas e ao mesmo tempo tão distantes no dia-a-dia. Abraço a todos!"
  />
  <ComentarioCard
    text="Foi simplesmente sensacional! Conheci pessoalmente pessoas que trabalho via teams. Colegas de outras gerências que futuramente trabalharemos juntos...Minha residência é no Paraná, trabalho há quase 20 anos na empresa e não conhecia praticamente nada sobre a história do Rio...Foi D+...Parabéns pela iniciativa!"
  />
  </div>


  )
}