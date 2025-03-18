'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { DialogClose } from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import { updateLID } from "../actions"
import { getLocalStorage, setLocalStorage } from "@/lib/localStorage"
import { useSearchParams } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"

export default function Dialogger() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [lid, setLid] = useState<string>('')
  const [uid, setUid] = useState<string>('')
  const params = useSearchParams()
  const { toast } = useToast()
  const { replace } = useRouter()
  const pathname = usePathname()
  const [openExtend, setOpenExtend] = useState<boolean>(false)



  function handleChange(e: any) {
    setLid(e.target.value)
  }

  function updateID() {
    setIsOpen(false)
    updateLID(lid, uid).then((_) => {
      toast({
        title: 'Lattes ID atualizado!'
      })
      setLocalStorage('lid', lid)
    })
  }

  useEffect(() => {
    setUid(getLocalStorage('uid') ?? '')
    if (params.get('first') != 'False' && params.get('first') != null) {
      setIsOpen(true)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      replace(`${pathname}`)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader className="w-flex flex-col justify-start items-center p-5">
          <DialogTitle className="font-bold text-2xl">Seja bem vindo! Insira seu ID Lattes</DialogTitle>
          <DialogDescription className="text-md">Por favor, insira apenas os números do seu ID.</DialogDescription>
        </DialogHeader>

        <Input placeholder="Ex.: 123321456"
          onChange={(e) => handleChange(e)} className="w-full rounded-xl bg-lightGrey border-transparent" />
        <Button onClick={() => setOpenExtend(!openExtend)} className="justify-start items-start p-0 m-0 hover:bg-transparent bg-transparent underline text-blue">Como saber o ID do Lattes?</Button>

        {openExtend && <div className="flex flex-col gap-1">
          <ul className="list-disc list-inside">
            <li>Acesse seu Currículo Lattes em http://lattes.cnpq.br.</li>
            <li>Clique no módulo "Dados gerais".</li>
            <li>Clique em "Identificação".</li>
          </ul>
          <Image width={402} height={181} src="/grillindo.png" alt="Como saber o ID do Lattes" />
        </div>}

        <DialogFooter className="mt-2 md:justify-between sm:justify-start">
          <Button onClick={updateID} className="bg-white rounded-lg 
            border-grey6 border-[1px] text-black font-bold
            w-1/2"
          >Agora não</Button>

          <Button onClick={updateID} className="w-1/2 bg-orange hover:bg-darkOrange text-white">Enviar</Button>


          {/* <DialogClose asChild onClick={() => console.log('aqui')}>
            <Button className="bg-white rounded-lg border-grey">Agora não</Button>
          </DialogClose> */}
        </DialogFooter>
        <Toaster />
      </DialogContent>
    </Dialog>
  )
}