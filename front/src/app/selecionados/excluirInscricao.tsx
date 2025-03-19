"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

export default function ExcluirModal({name, isOpen, onClose, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Simulando uma requisição a uma API com um pequeno delay

      onDelete(name); // Substituir pelo nome real

      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Inscrição excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir inscrição:", error);
    } finally {
      setLoading(false);
      onClose(); // Fecha o modal após a requisição
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${montserrat.className} max-w-md p-6 text-center`}>
        {/* Cabeçalho */}
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-black">Excluir Inscrição?</DialogTitle>
        </DialogHeader>

        <p className="text-gray-600 mt-2">
          Você realmente deseja excluir a inscrição deste membro nesta atividade?
        </p>

        {/* Botões alinhados corretamente */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 w-full">
          <Button 
            onClick={handleDelete} 
            disabled={loading}
            className="rounded-full bg-error text-white-important px-6 py-2 w-full sm:w-auto"
          >
            {loading ? "Excluindo..." : "Sim, excluir inscrição"}
          </Button>
          <Button 
            onClick={onClose} 
            className="rounded-full bg-[#0E39F7] text-white-important"
            >
            Não, manter este membro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
