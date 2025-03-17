"use client";

import { useState } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AtividadesCard from "./atividadesCards";
import AddMemberModal from "./addMembro";
import { Montserrat } from 'next/font/google';


const montserrat = Montserrat({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

export default function SelectedUsersPage() {
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
      iconType: "selecionados",
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
      iconType: "selecionados",
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
        iconType: "selecionados",
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
        iconType: "selecionados",
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
        <span className="text-blue-800 font-semibold">Selecionados</span>
      </nav>
      
      <h1 className="text-3xl font-bold mt-10">Selecionados</h1>
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
