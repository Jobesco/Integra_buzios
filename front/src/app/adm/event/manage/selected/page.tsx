'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"

export default function SelectedPage() {
  const { push } = useRouter()

  // TODO histórico!!!!! só não tem aqui!!

  return (
    <div className="container bg-background h-full mt-32
      flex flex-col items-start justify-start gap-8 text-4xl">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight 
        lg:text-5xl text-left mb-4">
        Selecionados
      </h1>

      <div className="w-full grid gap-4">
        <div className="flex gap-2 text-base items-center">
          <span className="mr-4">Filtrar por:</span>
          <div className="mr-2 flex items-center">
            <Checkbox id="select1" className="p-2 mr-2" />
            <label
              htmlFor="select1"
              className="leading-none text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Grupo aprovado
            </label>
          </div>
          <div className="mr-2 flex items-center">
            <Checkbox id="select2" className="p-2 mr-2" />
            <label
              htmlFor="select2"
              className="leading-none text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Aguardando aprovação
            </label>
          </div>
          <div className="mr-2 flex items-center">
            <Checkbox id="select3" className="p-2 mr-2" />
            <label
              htmlFor="select3"
              className="leading-none text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Inscrições insuficientes
            </label>
          </div>

        </div>

        <div className="flex justify-start items-center 
          p-4 bg-gray-200 gap-6">
          <h2>{'title goes here'}</h2>
          <Button className="bg-primary900 text-background px py 
            rounded-full" onClick={() => push('/adm/event/new')}>
            +
          </Button>
        </div>

        <div className="pl-4 flex gap-8">
          <div className="p-2 grid gap-0 justify-start items-start text-base">
            <span className="text-collie">Data de Início:</span>
            <span className="text-primary">DATA</span>
          </div>
          <div className="p-2 grid gap-0 justify-start items-start text-base">
            <span className="text-collie">Data de Término:</span>
            <span className="text-primary">DATA</span>
          </div>

        </div>
      </div>

      <div className="w-full flex flex-col gap-8">
        <h2>Selecionados</h2>
        <div className="grid grid-cols-3 gap-4">
          <Button asChild className="rounded-full">
            <div className="flex justify-center 
              items-center p-4 bg-primary900 rounded-full text-base hover:cursor-pointer">
              <span className="px-3 flex gap-1
                text-surface">
                {/* <Image unoptimized width="20" height="20" src={prancheta} alt="Gerenciar atividades" /> */}
                <span>Lista dos Selecionados</span>
              </span>

            </div>
          </Button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-8">
        <h2>Formulários</h2>
        <div className="grid grid-cols-3 gap-4">
          <Button asChild className="rounded-full">
            <div className="flex justify-center 
              items-center p-4 bg-primary900 rounded-full text-base hover:cursor-pointer">
              <span className="px-3 flex gap-1
                text-surface">
                {/* <Image unoptimized width="20" height="20" src={prancheta} alt="Gerenciar atividades" /> */}
                <span>Guias voluntários</span>
              </span>

            </div>
          </Button>

          <Button asChild className="rounded-full">
            <div className="flex justify-center 
              items-center p-4 bg-primary900 rounded-full text-base hover:cursor-pointer">
              <span className="px-3 flex gap-1
                text-surface">
                {/* <Image unoptimized width="20" height="20" src={prancheta} alt="Gerenciar atividades" /> */}
                <span>Participantes</span>
              </span>

            </div>
          </Button>

          <Button asChild className="rounded-full">
            <div className="flex justify-center 
              items-center p-4 bg-primary900 rounded-full text-base hover:cursor-pointer">
              <span className="px-3 flex gap-1
                text-surface">
                {/* <Image unoptimized width="20" height="20" src={prancheta} alt="Gerenciar atividades" /> */}
                <span>Feedback</span>
              </span>

            </div>
          </Button>
        </div>


        <Button asChild className="rounded-full w-1/3 mt-10">
          <div className="flex justify-center 
              items-center p-4 bg-primary900 rounded-full text-base hover:cursor-pointer">
            <span className="px-3 flex gap-1
                text-surface">
              {/* <Image unoptimized width="20" height="20" src={prancheta} alt="Gerenciar atividades" /> */}
              <span>Finalizar evento</span>
            </span>

          </div>
        </Button>
      </div>

    </div>
  )
}
