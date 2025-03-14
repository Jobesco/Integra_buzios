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
import { getLocalStorage, delLocalStorage, setLocalStorage } from "@/lib/localStorage";
import { MouseEventHandler, useEffect, useState } from "react";
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
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import grupo from "@/public/adm/group.png"
import integra from "@/public/adm/integra.png"
import SignupModal from "@/components/SignupModal/SignupModal";

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
  const [adminToggle, setAdminToggle] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const { toast } = useToast()
  const { push } = useRouter()
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  useEffect(() => {
    setUserName(getLocalStorage('name') ?? '')
    setProfilePic(getLocalStorage('picture') ?? '')
    setEmail(getLocalStorage('email') ?? '')

    // Verificar autenticação
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/check-auth', {
          method: 'GET',
          credentials: 'include', // Importante para enviar cookies de sessão
        });
        const data = await response.json();
        setIsAuthenticated(data);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [])

  // Função para abrir o modal
  const openModal = () => {
    setIsOpen(true);
    setIsSignupOpen(false);
  }

  // Função para fechar o modal
  const closeModal = () => {
    setIsSignupOpen(false);
    setIsOpen(false);
  }

  // Função para lidar com o login
  const handleLogin = () => {
    console.log('Usuário logado');
    closeModal();
  };

  const openSignupModal = () => {
    setIsOpen(false);
    setIsSignupOpen(true);
  };

  function handleClick(admin: boolean) {
    setAdminToggle(admin)
  }

  return (
    <html lang="en" className="h-full">
      <body className={cn(
        "bg-background font-sans antialiased overflow-x-hidden h-full flex flex-col",
        barlow.variable
      )}>
        {pathname !== '/login' && (
          <header className="z-50 w-screen sticky flex h-[112px] items-center justify-between bg-[#0E39F7] py-8">
            {isAuthenticated && (
              <Menubar className="rounded-full h-12 text-primary900 w-[310px] flex justify-between font-bold absolute left-1/2 transform -translate-x-1/2">
                <MenubarMenu>
                  <Button
                    className={cn(
                      "hover:bg-secondary300 hover:text-surface w-1/2 rounded-full py-2 px-12 bg-background text-onSurface",
                      adminToggle && "bg-[#FF9F1C] text-surface"
                    )}
                    onClick={() => handleClick(true)}
                  >
                    Admin
                  </Button>
                </MenubarMenu>
                <MenubarMenu>
                  <Button
                    className={cn(
                      "hover:bg-secondary300 hover:text-surface w-1/2 rounded-full py-2 px-12 bg-background text-onSurface",
                      !adminToggle && "bg-[#FF9F1C] text-surface"
                    )}
                    onClick={() => handleClick(false)}
                  >
                    Participante
                  </Button>
                </MenubarMenu>
              </Menubar>
            )}

            <div className="header-container flex justify-between w-full">
              <div className="logo-container">
                <Link href="/home" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                  <Image width="40" height="50" src={grupo} alt="Buzios" />
                  <Image width="107" height="30" src={integra} alt="Integra" />
                </Link>
              </div>

              {!isAuthenticated && (
                <div className="buttons-container ml-auto md:ml-0 md:absolute md:right-8">
                  <Button
                    onClick={openModal}
                    className="bg-transparent text-white-important hover:bg-[#FF9F1C] rounded-full px-6 py-2 transition-colors duration-300"
                  >
                    Entrar na conta
                  </Button>
                  <Button
                    onClick={openSignupModal}
                    className="bg-[#FF9F1C] text-white-important hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
                  >
                    Crie sua conta
                  </Button>
                </div>
              )}

              <div className="flex items-center gap-10 text-surface">
                <span className="ml-auto" />
                {isAuthenticated && (
                  <Sheet>
                    <SheetTrigger className="rounded-full bg-transparent flex flex-row items-center p-1">
                      <Avatar className="w-8 h-8 mr-3 rounded-full bg-surface">
                        <AvatarImage src={profilePic} className="rounded-full" />
                        <AvatarFallback className="text-onSurface">
                          {"CN" || getInitials(userName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="mr-2">
                        <b>{"Admin Silva" || userName.split(' ')[0]}</b>
                      </span>
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
                        </SheetTitle>
                      </SheetHeader>
                      <div className="flex flex-col mt-8 gap-2 font-medium">
                        <Button className="rounded-lg p-3 py-6 inline-flex gap-2 hover:bg-orange hover:text-white text-black text-md bg-transparent justify-start">
                          <RefreshCcw strokeWidth={1.5} />
                          opcao 1
                        </Button>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                          <DialogTrigger className="rounded-lg p-3 inline-flex gap-2 hover:bg-orange hover:text-white text-black text-md bg-transparent justify-start">
                            <User strokeWidth={1.5} />
                            opcao 2
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Atualize seu ID Lattes</DialogTitle>
                              <DialogDescription>
                                Por favor, insira apenas os números do seu ID
                              </DialogDescription>
                            </DialogHeader>
                            <Input
                              placeholder="Ex: 1234567890"
                              className="w-full rounded-xl bg-lightGrey border-transparent"
                            />
                            <DialogFooter className="mt-10 md:justify-between sm:justify-start">
                              <Button className="bg-orange hover:bg-darkOrange">Enviar</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button className="rounded-lg p-3 py-6 inline-flex gap-2 hover:bg-orange hover:text-white text-black text-md bg-transparent justify-start">
                          <LogOut strokeWidth={1.5} />
                          Sair
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
              </div>
            </div>
          </header>
        )}

        <main className="flex-grow">{children}</main>

        <Toaster />
        <footer className="flex-shrink-0 flex flex-row justify-center bg-primary900 h-20 py-4 gap-4 font-bold">
          <Link
            href="/home"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Image width="40" height="50" src="/group.png" alt="Buzios" />
          </Link>

          <div className="text-background">© 2025 Integra<br />
            Todos os direitos reservados.</div>
        </footer>
      </body>
    </html>
  );
}