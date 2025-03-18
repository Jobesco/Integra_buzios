"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    weight: ['400', '700', '800'],
    subsets: ['latin'],
  });

interface ModalCancelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function ModalCancel({ 
  isOpen, onClose, title, description, 
  confirmText = "Confirmar", cancelText = "Cancelar", 
  onConfirm, onCancel 
}: ModalCancelProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className={`${montserrat.className} text-center text-4xl m-4`} >{title}</DialogTitle>
          <DialogDescription className={`${montserrat.className} text-center text-sm`} >{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex flex-col gap-2 items-center justify-center px-8 py-3">
            <Button
                className="w-full bg-error !text-white hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
                onClick={onConfirm}
            >
                {confirmText}
            </Button>
            <Button
                variant="outline"
                className="w-full bg-[#0E39F7] text-white-important hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
                onClick={onCancel || onClose}
            >
                {cancelText}
            </Button>
            </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
