import { fetchOnePaper } from "../api/papers"
import { Separator } from "@/components/ui/separator"
import BackButton from "./goBack"
import PaperView from "./paperView"
import Categories from "./categories"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function ViewPaper({ searchParams }: {
  searchParams: {
    id: number
  }
}) {
  const id = searchParams.id
  let paper
  try {
    paper = await fetchOnePaper(id)
  } catch (error) {
    console.log('error!', error)
    notFound()
  }
  if (!paper) notFound()

  return (
    <div className="w-full px-32 my-12 flex flex-col justify-start">

      <Image src={"/shape1.png"} width="100" height="250" alt=""
        className="absolute left-0 top-[220px]" />

      <BackButton className="bg-transparent hover:bg-lightGrey m-0 self-start" />
      <span className="w-full"></span>
      <div className="flex flex-row mt-5 mb-12 w-full">
        <Separator className="bg-orange w-28" />
        <Separator className="bg-primary flex-1" />
      </div>
      {/* // ? categorias (area no backend) ou keywords
          // TODO linkar a uma pesquisa com a categoria / keyword */}
      <Categories className="mb-4 h-8 w-full">
        {paper.keywords}
      </Categories>
      {/* // TODO change date to actual publication date */}
      <PaperView {...paper} description={paper.notes}
        authors={paper.authors} />
    </div>
  )
}