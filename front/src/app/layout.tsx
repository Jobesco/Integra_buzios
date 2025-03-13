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
    // Adicione aqui a lógica de login
    console.log('Usuário logado');
    closeModal(); // Fecha o modal após o login
  };

  const openSignupModal = () => {
    setIsOpen(false);
    setIsSignupOpen(true); // Abre o modal de signup
  };

  function handleClick(admin: boolean) {
    setAdminToggle(admin)
  }
  

  return (
    <html lang="en" className="h-full">
      <body className={
        cn("bg-background font-sans antialiased overflow-x-hidden h-full",
          barlow.variable
        )}>

        {pathname !== '/login' &&
        <header className="z-50 w-screen sticky flex h-[112px] 
          items-center justify-between bg-primary900 px-32 py-8"
        >
          <Link
            href="/home"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Image width="40" height="50" src={grupo} alt="Buzios" />
            <Image width="107" height="30" src={integra} alt="Integra" />
          </Link>
        
          {isAuthenticated && (
          <Menubar className="rounded-full h-12 text-primary900 
            w-[310px] flex justify-between font-bold">
            <MenubarMenu>
                <Button className={cn("hover:bg-secondary300 hover:text-surface w-1/2 rounded-full py-2",
                  "px-12 bg-background text-onSurface",
                  adminToggle && "bg-[#FF9F1C] text-surface"
                )} onClick={() => handleClick(true)}>
                Admin
              </Button>
            </MenubarMenu>
            <MenubarMenu>
              <Button className={cn("hover:bg-secondary300 hover:text-surface w-1/2 rounded-full py-2",
                "px-12 bg-background text-onSurface",
                !adminToggle && "bg-[#FF9F1C] text-surface"
              )} onClick={() => handleClick(false)}>
                Participante
              </Button>
            </MenubarMenu>
          </Menubar>
          )}

            <div className="flex items-center gap-10 text-surface">
            
            {!isAuthenticated && (
              <>
              <Button onClick={openModal}
                className="bg-transparent text-white hover:bg-[#FF9F1C] rounded-full px-6 py-2 transition-colors duration-300"
              >
                Entrar na conta
              </Button>
              <Button onClick={openSignupModal}
                className="bg-[#FF9F1C] text-white hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
              >
                Crie sua conta
              </Button>
            </>
            )}

            <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />


              <span className="ml-auto" />
              {isAuthenticated && (
                <Sheet> 
                  <SheetTrigger className="rounded-full bg-transparent flex 
                flex-row items-center p-1">
                    <Avatar className="w-8 h-8 mr-3 rounded-full bg-surface">
                      <AvatarImage src={profilePic} className="rounded-full" />
                      <AvatarFallback className="text-onSurface">{"CN" ||getInitials(userName)}</AvatarFallback>
                    </Avatar>
                    <span className="mr-2"><b>{"Admin Silva" || userName.split(' ')[0]}</b></span>
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
                      <Button className="rounded-lg p-3 py-6 inline-flex gap-2 hover:bg-orange 
                      hover:text-white text-black text-md bg-transparent justify-start"
                      >
                        <RefreshCcw strokeWidth={1.5} />
                        opcao 1
                      </Button>
                      <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger className="rounded-lg p-3 inline-flex gap-2 hover:bg-orange 
                        hover:text-white text-black text-md bg-transparent justify-start">
                          <User strokeWidth={1.5} />
                          opcao 2
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Atualize seu ID Lattes</DialogTitle>
                            <DialogDescription>Por favor, insira apenas os números do seu ID</DialogDescription>
                          </DialogHeader>

                          <Input placeholder="Ex: 1234567890"
                            className="w-full rounded-xl bg-lightGrey border-transparent" />
                          <DialogFooter className="mt-10 md:justify-between sm:justify-start">
                            <Button className="bg-orange hover:bg-darkOrange">Enviar</Button>
                          </DialogFooter>

                        </DialogContent>
                      </Dialog>
                      <Button className="rounded-lg p-3 py-6 inline-flex gap-2 hover:bg-orange 
                      hover:text-white text-black text-md bg-transparent justify-start">
                        <LogOut strokeWidth={1.5} />
                        Sair
                      </Button>

                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>


            {/* Modal de Login */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md space-y-4">
          <DialogHeader>
            <DialogTitle className="text-4xl font-bold text-center"><strong>Faça seu login</strong></DialogTitle>
          </DialogHeader>

          {/* Campos do formulário */}
          <div className="space-y-4 mx-5">
            <p className="text-sm font-medium text-gray-700 "><strong>E-mail Petro:</strong></p>
            <Input
              type="text"
              placeholder="Digite seu e-mai Petrobras"
              className="w-full"
            />
            <p className="text-sm font-medium text-gray-700"><strong>Senha:</strong></p>
            <Input
              type="password"
              placeholder="Senha"
              className="w-full"
            />
          </div>

          {/* Botão de Login */}
          <Button
            onClick={handleLogin}
            className=" !text-white  bg-[#FF9F1C] hover:!bg-[#0e39f7] rounded-full px-6 py-2 transition-colors duration-300"

          >
            Entrar
          </Button>

          <p className="text-center font-medium text-gray-50">Esqueci a minha senha</p>
          <hr></hr>

          {/* Link para Cadastro */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">Não tem uma conta? </span>

            <span onClick={openSignupModal} className="cursor-pointer text-blue-500 hover:underline">
              <strong>Crie sua conta</strong>
            </span>
            
          </div>
        </DialogContent>
      </Dialog>

        </header>}

        <main className="h-full">{children}</main>

        <Toaster />
        <footer className="static flex flex-row justify-center 
        bg-primary900 h-20 py-4 gap-4 font-bold">
          <Link
            href="/home"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Image width="40" height="50" src="/group.png" alt="Buzios" />
          </Link>

          <div className="text-background">© 2025 Integra<br/>
            Todos os direitos reservados.</div>
          
        </footer>

      </body>
    </html>
  );
}