"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash, Loader2 } from "lucide-react";
import { Search } from "lucide-react";
import Link from "next/link";
import { Montserrat } from 'next/font/google';
import AtividadesCard from "../selecionados/atividadesCards";


const montserrat = Montserrat({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

const fetchFakeSeach = (query) => {
  console.log("Buscando dados para:", query);
  setTimeout(() => {
    console.log("Dados simulados para:", query);
  }, 1000); // Simulando delay de 1 segundo para a busca fake
};

const gerenciasIniciais = [{ id: 1, nome: "BUZIOS" }];

export default function EditarGerencias() {
  const [gerencias, setGerencias] = useState(gerenciasIniciais);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchGerente, setSearchGerente] = useState();

  const handleChoose = (participantName: string) => {
    setSearchGerente(participantName);
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
      iconType:"administradores",
      gerente:true,
    },
    // Adicione mais objetos conforme necessário
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchGerente(query ? query.split(">") : []);
    // fetchFakeData(query); // Chama a API fake
  };

  return (
    <div className={`${montserrat.className} p-6 max-w-2xl mx-auto`}>
      <Link href="/painel" className="text-sm text-gray-500">&lt;&lt; Voltar</Link>
      
      <nav className="text-sm text-gray-500 mt-2">
        <Link href="/painel" className="text-blue-500">Painel de controle</Link> <span>&gt;</span> 
        <Link href="/gerenciar-evento" className="text-orange-500">Editar administradores</Link>
      </nav>

      {/* Título */}
      <h1 className="text-3xl font-bold mt-10 mb-4">Editar administradores</h1>

      {/* Barra de Pesquisa */}
      <div className="relative mb-4 mt-7">
        <Input
          placeholder="Pesquisar gerências"
          className="pl-8" // Espaçamento para o ícone
          value={searchGerente}
          onChange={handleSearchChange}
        />
        <Search className="absolute right-2 top-2 text-gray-400 w-4 h-4" />
      </div>

      
      {/* Lista de Gerências */}
    
      <div className="flex items-center justify-between p-4 mb-2">
        
        <AtividadesCard 
        {...atividades}
        onChoose={handleChoose} 
          />
      </div>
    </div>
  );
}
