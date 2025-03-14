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
import img from "@/public/100percente.svg"

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

export function HomeCard(props: any) {

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
      router.push(`/view?${params.toString()}`);
    }
  
    return (
        <Card
      className=" bg-[#F0F0F0] w-min-[230px] w-full rounded-xl flex flex-row items-start text-left py-10 px-11 cursor-pointer"
    >
      {props.show_img && (
        <div className="w-29 h-29 rounded-lg overflow-hidden mr-4 flex-shrink-0">
          <Image
            src={img}
            alt="Imagem do card"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Texto à direita */}
      <div className="flex-1 flex flex-col justify-start">
    <CardHeader className="m-0 p-0">
      <div className="flex flex-col gap-2 p-0 m-0 text-grey3 text-md">
        {/* Renderizar cada linha como um parágrafo separado */}
              <p className={clsx(montserrat.className, "  font-extrabold text-black bg-homeBg px-3 rounded-lg border-selectedBorderOpaque hover:border-selectedBorder whitespace-pre-line break-words")}>
              {textWithLineBreaks}
              </p>
      </div>
    </CardHeader>
      </div>
    </Card>
    );
  }

export default function ExploreCardPage() {
  // const { selectedCategory } = useContext(SelectedCategoryContext)
  // const [explore, setExplore] = useState([])
  const [explore, setExplore] = useState(); // Usando dados mockados

  // useEffect(() => {
  //   fetchFromAreas(selectedCategory).then((data) => {
  //     setExplore(data.slice(0, 6))
  //   })
  // }, [selectedCategory])

  // TODO use resizable and remove slice for dynamic sizes
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <HomeCard
    show_img={false}
    text={`+
        Networking e crescimento profissional
        +
        Construção de novos relacionamentos`}
  />
  <HomeCard
    show_img={true}
    text={`Quem
    participa,
      recomenda
    o Integra.`}
  />
  <HomeCard
    show_img={false}
    text={`100%
das avaliações
dizem que a experiência
do Integra é excelente!`}
  />
</div>
  )
}