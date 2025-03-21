"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Montserrat } from 'next/font/google';


const montserrat = Montserrat({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});


export default function ConfirmationModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${montserrat.className} max-w-md p-6 text-center`}>
        {/* Conteúdo */}
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-black">Lista enviada!</DialogTitle>
        </DialogHeader>

        <p className="text-gray-600 mt-2">
          A lista foi enviada para seleção e formação dos grupos do seu evento.
        </p>

        {/* Botão de ação */}
        <Button onClick={onClose} 
          className="rounded-full bg-[#0E39F7] text-white-important">
          Continuar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
