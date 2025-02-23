'use client'
import type { Metadata } from "next";
import "./globals.css";
import { Barlow } from "next/font/google";

import { cn } from "@/lib/utils";

import Link from "next/link"
import Image from "next/image"

import {
  CircleUser, EllipsisVertical, Search, ChevronDown, ChevronUp,
  BookmarkPlus, FileText, LogOut, RefreshCcw, User
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetTitle,
  SheetDescription, SheetHeader
} from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

import { usePathname, useRouter } from "next/navigation";
import { updateLID, lattesSync } from "@/app_old/actions";
import { getLocalStorage, delLocalStorage, setLocalStorage } from "@/lib/localStorage";
import { useEffect, useState } from "react";
import { getInitials } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";


const barlow = Barlow({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap"
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const [userName, setUserName] = useState<string>('')
  const [profilePic, setProfilePic] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [lid, setLid] = useState<string>('')
  const [uid, setUid] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { toast } = useToast()
  const { push } = useRouter()

  function manualSync() {
    try {
      lattesSync(getLocalStorage('lid')).then(() => {
        toast({ title: 'Lattes Sincronizado!' })
      }, (reason) => {
        if (reason.message == 'Inexistent ID')
          toast({ title: 'ID Inexistente' })
        if (reason.message == 'Internal server error')
          toast({ title: 'Erro do servidor' })
      })
    } catch (error) {
      toast({ title: 'Algo deu errado!' })
    }
  }

  function updateID() {
    updateLID(lid, uid).then(() => {
      toast({
        title: 'Lattes ID atualizado!'
      })
      setIsOpen(false)
      setLocalStorage('lid', lid)
    })
  }

  function logout() {
    push(`${process.env.NEXT_PUBLIC_BROWSER_BACK_ENDPOINT}/auth/logout`)
    delLocalStorage('name')
    delLocalStorage('picture')
    delLocalStorage('email')
    delLocalStorage('uid')
    toast({ title: 'Deslogado com sucesso.' })
  }

  function handleChange(e: any) {
    setLid(e.target.value)
  }

  useEffect(() => {
    setUserName(getLocalStorage('name') ?? '')
    setProfilePic(getLocalStorage('picture') ?? '')
    setEmail(getLocalStorage('email') ?? '')
    setUid(getLocalStorage('uid') ?? '')
  }, [])

  return (
    <html lang="en">
      <body className={
        cn("bg-background font-sans antialiased overflow-x-hidden h-full",
          barlow.variable
        )}>

        {pathname !== '/login' &&
          <header className="z-50 w-screen sticky flex h-20 items-center 
            justify-between border-b bg-[#F5F5F5] px-20"
          >
            <Link
              href="/home"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Image width="96" height="63" src="/logo_header.png" alt="Cesar Research Hub" />
            </Link>
            <nav className="pl-10 flex-col gap-16 text-lg md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              <Link
                href="/home"
                className="text-muted-foreground transition-colors hover:font-bold"
              >
                Início
              </Link>
              <Link
                href="/trabalhos"
                className="text-muted-foreground transition-colors hover:font-bold"
              >
                Trabalhos
              </Link>
            </nav>

            <div className="flex w-full items-center gap-10 md:ml-auto">
              <span className="ml-auto" />
              <Sheet>
                <SheetTrigger className="rounded-full bg-transparent flex 
                flex-row items-center p-1">
                  <Avatar className="w-8 h-8 mr-3">
                    <AvatarImage src={profilePic} className="rounded-full" />
                    <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                  </Avatar>
                  <span className="mr-10">Olá, <b>{userName.split(' ')[0]}</b></span>
                  <ChevronDown size={16} strokeWidth={2.5} />
                </SheetTrigger>
                <SheetContent className="py-6 px-6 w-[310px]">
                  <SheetHeader>
                    <SheetTitle className="flex flex-row items-center gap-4">
                      <Avatar className="w-12 h-12 mr-3">
                        <AvatarImage src={profilePic} className="rounded-full" />
                        <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-bold">{userName}</p>
                        <p className="text-sm">{email}</p>
                      </div>
                      {/* <ChevronUp size={16} strokeWidth={2.5} /> */}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col mt-8 gap-2 font-medium">
                    {/* <Link className="rounded-lg p-3 inline-flex gap-2 hover:bg-orange 
                    hover:text-white" href="/upload">
                    <BookmarkPlus strokeWidth={1.5} />
                    Adicionar artigo
                  </Link> */}
                    <Button className="rounded-lg p-3 py-6 inline-flex gap-2 hover:bg-orange 
                      hover:text-white text-black text-md bg-transparent justify-start"
                      onClick={manualSync}
                    >
                      <RefreshCcw strokeWidth={1.5} />
                      Sync Manual com Lattes
                    </Button>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                      <DialogTrigger className="rounded-lg p-3 inline-flex gap-2 hover:bg-orange 
                        hover:text-white text-black text-md bg-transparent justify-start">
                        <User strokeWidth={1.5} />
                        Atualizar ID Lattes
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Atualize seu ID Lattes</DialogTitle>
                          <DialogDescription>Por favor, insira apenas os números do seu ID</DialogDescription>
                        </DialogHeader>

                        <Input placeholder="Ex: 1234567890"
                          onChange={(e) => handleChange(e)} className="w-full rounded-xl bg-lightGrey border-transparent" />
                        <DialogFooter className="mt-10 md:justify-between sm:justify-start">
                          <Button className="bg-orange hover:bg-darkOrange" onClick={updateID}>Enviar</Button>
                        </DialogFooter>

                      </DialogContent>
                    </Dialog>
                    <Button className="rounded-lg p-3 py-6 inline-flex gap-2 hover:bg-orange 
                      hover:text-white text-black text-md bg-transparent justify-start"
                      onClick={logout}
                    >
                      <LogOut strokeWidth={1.5} />
                      Sair
                    </Button>

                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </header>}
        <main>{children}</main>
        <Toaster />
        <footer className="h-[436px] flex flex-row items-center justify-between bg-lightGrey pt-30 px-36">
          <div className="w-[282px] h-[187px] bg-[url('/logo_footer.png')] bg-no-repeat bg-center bg-cover" />
          <div className="flex flex-row w-1/2 gap-16 justify-between">
            <div className="flex flex-col min-w-28 gap-10">
              <p className="font-bold text-xl text-black">Links</p>
              <div className="flex flex-col gap-6">
                <Link href="/home">Home</Link>
                <Link href="/trabalhos">Trabalhos</Link>
              </div>
            </div>
            <div className="flex flex-col min-w-28 gap-10">
              <p className="font-bold text-xl text-black">Temas</p>
              <div className="grid grid-cols-2 gap-y-6 gap-x-40">
                <Link href="#">Educação</Link>
                <Link href="#">Design</Link>
                <Link href="#">Tecnologia</Link>
                <Link href="#">Saúde</Link>
                <Link href="#">Meio Ambiente</Link>
                <Link href="#">Política</Link>
                <Link href="#">História</Link>
                <Link href="#">Bem-estar</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
