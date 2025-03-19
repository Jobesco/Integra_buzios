"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AtividadesCard from "../selecionados/atividadesCards";
import { Montserrat } from 'next/font/google';


const montserrat = Montserrat({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

export default function VoluntaiosUsersPage() {
  // informar aqui como esta o evento
  const status = "no started"

  const renderActionButton = (event) => {

    return (
      <div className="flex items-center gap-3">
        <Button className="bg-success text-white-important px-6 rounded-full">
          Selecionar todos grupos
        </Button>

        {event == "no started" ? (
          <Button className="bg-[#0E39F7] text-white-important px-12 rounded-full">
            Iniciar formulário
          </Button>
      ) : event == "started" ? (
        <Button className="bg-[#90a3b0] text-white-important px-12 rounded-full">
          Pausar Formulário
        </Button>
      ) : event == "finished" ? (
        <Button className="bg-white border-2 border-error text-error px-12 rounded-full">
          Formulário finalizado
        </Button>
      ) :(
        <Button className="bg-gray-500 text-white px-12 rounded-full" disabled>
          Indefinido
        </Button>
    )}
    </div>)};

  const [filters, setFilters] = useState({
    approved: true,
    pending: false,
    insufficient: false,
  });

  const toggleFilter = (filter) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const [atividades, setAtividades] = useState(
    {
      id:1,
      participants: [
        { name: "Leonardo Pêra", highlighted: true },
        { name: "Usuário da Silva", highlighted: false },
        { name: "Usuário Número Dois Santos", highlighted: false },
        { name: "Usuário Três Silveira Lima do Rêgo", highlighted: false },
      ],
      status: "Adicionar atividade",
      iconType:"atividades",
    },
    // Adicione mais objetos conforme necessário
  );

  const [members, setMembers] = useState([]);

  return (
    <div className={`${montserrat.className} px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 pt-20`}>
      <Link href="/painel" className="text-sm text-gray-500">&lt;&lt; Voltar</Link>
      
      <nav className="text-sm text-gray-500 mt-2">
        <Link href="/painel" className="text-blue-500">Painel de controle</Link> <span>&gt;</span> 
        <Link href="/gerenciar-evento" className="text-orange-500">Gerenciar atividades</Link> <span>&gt;</span>
      </nav>
      
      <div className="flex items-center justify-between w-full mt-10">
        <h1 className="text-4xl font-bold">Gerenciar atividades</h1>
      </div>
      <div className="relative mt-4 max-w-md">
        <Input className="pl-10" placeholder="Pesquisar por atividade, guia voluntário, participante" />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      <div className="mt-12 w-full p-4">
        <AtividadesCard {...atividades} />
      </div>

    </div>
  );
}
