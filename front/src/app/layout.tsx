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
// import { updateLID, lattesSync } from "@/app_old/actions";
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
import Navbar from "@/components/ui/NavBar";


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

  }


  function logout() {
    // push(${process.env.NEXT_PUBLIC_BROWSER_BACK_ENDPOINT}/auth/logout)
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
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}