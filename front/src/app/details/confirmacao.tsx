"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Montserrat } from 'next/font/google';
import ic_check from "@/public/check.svg";
import Image from "next/image";

const montserrat = Montserrat({
    weight: ['400', '700', '800'],
    subsets: ['latin'],
  });

interface ModalCancelProps {
  isOpen: boolean;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function ModalCancel({ 
  isOpen, onClose,
  confirmText = "Confirmar"
}: ModalCancelProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 rounded-lg">
        <DialogHeader>
        <Image className={` m-4`} src={ic_check} alt="Local" width={16} height={16} />
          <DialogTitle className={`${montserrat.className} text-center text-4xl m-4`} >Inscrição 
          confirmada!</DialogTitle>
          <DialogDescription className={`${montserrat.className} text-center text-sm`} >Sua inscrição como Guia Voluntário foi realizada com sucesso. </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex flex-col gap-2 items-center justify-center px-8 py-3">
            <Button
                variant="outline"
                className="w-full bg-[#FF9F1C] text-white-important hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
                onClick={onClose}
            >
                OK
            </Button>
            </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
