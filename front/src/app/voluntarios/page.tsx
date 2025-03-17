"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Montserrat } from 'next/font/google';
import AtividadesCard from "../selecionados/atividadesCards";


const montserrat = Montserrat({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

export default function VoluntaiosUsersPage() {
  // informar aqui como esta o evento
  const status = "no started"

  const renderActionButton = (event) => {
    if (event == "no started") {
      return (
        <Button className="bg-[#0E39F7] text-white-important px-12 rounded-full">
          Iniciar formulário
        </Button>
      );
    } else if (event == "started") {
      return (
        <Button className="bg-[#90a3b0] text-white-important px-12 rounded-full">
          Pausar Formulário
        </Button>
      );
    }else if (event == "finished") {
      return (
        <Button className="bg-white border-2 border-error text-error px-12 rounded-full">
          Formulário finalizado
        </Button>
      );
    } else {
      return (
        <Button className="bg-gray-500 text-white px-12 rounded-full" disabled>
          Indefinido
        </Button>
      );
    }
  };

  const [filters, setFilters] = useState({
    approved: true,
    pending: false,
    insufficient: false,
  });

  const toggleFilter = (filter) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const [atividades, setAtividades] = useState([
    {
        id:1,
      title: "Escalada #01",
      subtitle: "15/15 vagas preenchidas",
      participants: [
        { name: "Leonardo Pêra", highlighted: true },
        { name: "Usuário da Silva", highlighted: false },
        { name: "Usuário Número Dois Santos", highlighted: false },
        { name: "Usuário Três Silveira Lima do Rêgo", highlighted: false },
      ],
      status: "Grupo aprovado",
      iconType: "voluntarios",
    },
    {
        id:2,
      title: "Escalada #02",
      subtitle: "10/15 vagas preenchidas",
      participants: [
        { name: "Maria Oliveira", highlighted: true },
        { name: "João Pedro", highlighted: false },
        { name: "Ana Souza", highlighted: false },
      ],
      status: "Inscrições insuficientes",
      iconType: "voluntarios",
    },
    {
        id:3,
        title: "Escalada #02",
        subtitle: "10/15 vagas preenchidas",
        participants: [
          { name: "Maria Oliveira", highlighted: true },
          { name: "João Pedro", highlighted: false },
          { name: "Ana Souza", highlighted: false },
        ],
        status: "Aguardando aprovação",
        iconType: "voluntarios",
      },
      {
        id:4,
        title: "Escalada #02",
        subtitle: "10/15 vagas preenchidas",
        participants: [
          { name: "Maria Oliveira", highlighted: true },
          { name: "João Pedro", highlighted: false },
          { name: "Ana Souza", highlighted: false },
        ],
        status: "Aguardando aprovação",
        iconType: "voluntarios",
      },
    // Adicione mais objetos conforme necessário
  ]);

  const [members, setMembers] = useState([]);


  return (
    <div className={`${montserrat.className} px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 pt-20`}>
      <Link href="/painel" className="text-sm text-gray-500">&lt;&lt; Voltar</Link>
      
      <nav className="text-sm text-gray-500 mt-2">
        <Link href="/painel" className="text-blue-500">Painel de controle</Link> <span>&gt;</span> 
        <Link href="/gerenciar-evento" className="text-orange-500">Gerenciar evento</Link> <span>&gt;</span>
        <span className="text-blue-800 font-semibold">Formulário </span><span>&gt;</span><span className="text-blue-800 font-semibold">Evento </span>
      </nav>
      
      <div className="flex items-center justify-between w-full mt-10">
        <h1 className="text-4xl font-bold">Guia de Voluntários</h1>
        {renderActionButton(status)}
      </div>
      <div className="relative mt-4 max-w-md">
        <Input className="pl-10" placeholder="Pesquisar por atividade, guia voluntário, participante" />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <span>Filtrar por:</span>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox checked={filters.approved} onCheckedChange={() => toggleFilter("approved")} />
          <span>Grupo aprovado</span>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox checked={filters.pending} onCheckedChange={() => toggleFilter("pending")} />
          <span>Aguardando aprovação</span>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox checked={filters.insufficient} onCheckedChange={() => toggleFilter("insufficient")} />
          <span>Inscrições insuficientes</span>
        </div>
      </div>

    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 p-4">
        {atividades.map((atividade, index) => (
            <AtividadesCard key={index} {...atividade} />
        ))}
    </div>

    
      
      
    </div>
  );
}
