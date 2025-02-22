'use client'
import { Button } from "@/components/ui/button"
import {
  useState,
  useEffect
} from "react"
import { fixDate, fixName } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export function MostAcessed({ ...props }) {
  // TODO animation on click and hover
  const searchParams = useSearchParams()
  const router = useRouter()


  function handleClick() {
    const params = new URLSearchParams(searchParams)
    params.set('id', String(props.pid))
    router.push(`/view?${params.toString()}`)
  }

  return (
    <Button className="hover:bg-transparent font-normal text-black 
      w-[382px] h-[109px] flex flex-row py-0 bg-transparent"
      onClick={handleClick}
    >
      <div className="w-[109px] h-full rounded-full bg-white flex 
        justify-center shadow-md">
        <h1 className="w-full h-full text-orange 
          text-7xl text-center leading-snug">{props.order}
        </h1>
      </div>
      <div className="w-2/3 h-full flex flex-col text-left py-4 pl-7">
        <div className="flex flex-row text-sm mb-1">
          <p>{props.name}</p>
          <p className="text-grey">
            {props.date ? ' - ' + props.date : ''}
          </p>
        </div>
        <p className="font-bold text-pretty normal-case line-clamp-2 text-wrap">
          {props.title}
        </p>
      </div>
    </Button>
  );
}

export default function MostAccessedPage({ mostAcessed }: {
  mostAcessed: any[]
}) {
  const [mostAcessed2, setMostAcessed] = useState<any[]>([])
  const [authors, setAuthors] = useState<string[]>([])

  useEffect(() => {
    setMostAcessed(mostAcessed)
    let temp: string[] = []
    mostAcessed.map((paper) => {
      temp.push(paper.authors.find((author: any) => author.author_is_owner).collaborator.name || 'Autor não encontrado')
    })
    setAuthors(temp)
  }, [mostAcessed])


  return (
    <div className="flex flex-row mt-10 gap-8 justify-center">
      {mostAcessed2.map((paper, index) =>
        <MostAcessed
          key={index}
          order={index + 1}
          name={fixName(authors.at(index) ?? '')}
          title={paper.title}
          // date={fixDate((paper.publication_date || paper.updated_date) ?? '')} // TODO use this
          date={paper.publication_year ?? ''}

          pid={paper.id}
          external_url={paper.external_url} />)}
    </div>
  )
}