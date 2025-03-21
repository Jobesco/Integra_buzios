"use client";
import { useState } from "react";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash, Loader2 } from "lucide-react";
import { Search } from "lucide-react";
import Link from "next/link";
import { Montserrat } from 'next/font/google';
import AtividadesCard from "../selecionados/atividadesCards";
import TabelaDeContas from "./contas";


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
  const [contas, setContas] = useState([]);

  useEffect(() => {
    // Simulando chamada para uma API fake
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        const data = {
          contas: [
            {
              "nome": "Carlos Eduardo Ferreira",
              "email": "carlos.ferreira@petrobras.com.br",
              "telefone": "(21) 98765-4321",
              "gerencia": "UN-RIO/OP-ESP/PROD-ESP",
              "genero": "MASC",
              "PDC": "NÃO"
            },
            {
              "nome": "Mariana Oliveira Souza",
              "email": "mariana.souza@petrobras.com.br",
              "telefone": "(21) 98123-4567",
              "gerencia": "UN-BUZ/ATP-BUZ-I/OP-FPSO-SEP-TAR",
              "genero": "FEM",
              "PDC": "Deficiência Auditiva"
            },
            {
              "nome": "Ricardo Mendes Costa",
              "email": "ricardo.costa@petrobras.com.br",
              "telefone": "(21) 98234-5678",
              "gerencia": "BUZIOS/PGP/GIP",
              "genero": "MASC",
              "PDC": "NÃO"
            },
            {
              "nome": "Juliana Figueiredo Lima",
              "email": "juliana.lima@petrobras.com.br",
              "telefone": "(21) 98987-6543",
              "gerencia": "UN-ESP/OP-ESP/PROD-ESP",
              "genero": "FEM",
              "PDC": "Deficiência Visual"
            },
            {
              "nome": "Fernando Antunes Braga",
              "email": "fernando.braga@petrobras.com.br",
              "telefone": "(21) 98654-3210",
              "gerencia": "UN-RIO/OP-ESP/PROD-ESP",
              "genero": "MASC",
              "PDC": "NÃO"
            },
            {
              "nome": "Camila Rodrigues Nascimento",
              "email": "camila.nascimento@petrobras.com.br",
              "telefone": "(21) 98321-4567",
              "gerencia": "UN-ES/ATP-ES-I/OP-FPSO-ATL-AB",
              "genero": "FEM",
              "PDC": "Deficiência Motora"
            },
            {
              "nome": "Rodrigo Martins Peixoto",
              "email": "rodrigo.peixoto@petrobras.com.br",
              "telefone": "(21) 98743-2109",
              "gerencia": "UN-BUZ/ATP-BUZ-II/OP-FPSO-ALM-TAM",
              "genero": "MASC",
              "PDC": "NÃO"
            },
            {
              "nome": "Tatiane Silva Borges",
              "email": "tatiane.borges@petrobras.com.br",
              "telefone": "(21) 98231-6789",
              "gerencia": "BUZIOS/PGP/GIP",
              "genero": "FEM",
              "PDC": "Deficiência Intelectual"
            },
            {
              "nome": "Eduardo Santos Oliveira",
              "email": "eduardo.oliveira@petrobras.com.br",
              "telefone": "(21) 98112-3344",
              "gerencia": "UN-RIO/OP-ESP/PROD-ESP",
              "genero": "MASC",
              "PDC": "NÃO"
            },
            {
              "nome": "Patrícia Medeiros Lemos",
              "email": "patricia.lemos@petrobras.com.br",
              "telefone": "(21) 98999-1122",
              "gerencia": "UN-ESP/OP-ESP/PROD-ESP",
              "genero": "FEM",
              "PDC": "Deficiência Auditiva"
            },
            {
              "nome": "Gabriel Nascimento Farias",
              "email": "gabriel.farias@petrobras.com.br",
              "telefone": "(21) 98678-5432",
              "gerencia": "BUZIOS/PGP/GIP",
              "genero": "MASC",
              "PDC": "NÃO"
            },
            {
              "nome": "Aline Barbosa Fernandes",
              "email": "aline.fernandes@petrobras.com.br",
              "telefone": "(21) 98345-6789",
              "gerencia": "UN-ES/ATP-ES-I/OP-FPSO-ATL-AB",
              "genero": "FEM",
              "PDC": "Deficiência Motora"
            },
            {
              "nome": "Vitor Correia Martins",
              "email": "vitor.martins@petrobras.com.br",
              "telefone": "(21) 98011-2233",
              "gerencia": "UN-BUZ/ATP-BUZ-I/OP-FPSO-SEP-TAR",
              "genero": "MASC",
              "PDC": "NÃO"
            },
            {
              "nome": "Renata Fonseca Carvalho",
              "email": "renata.carvalho@petrobras.com.br",
              "telefone": "(21) 98199-8877",
              "gerencia": "UN-RIO/OP-ESP/PROD-ESP",
              "genero": "FEM",
              "PDC": "Deficiência Visual"
            },
            {
              "nome": "Diego Pereira Mendes",
              "email": "diego.mendes@petrobras.com.br",
              "telefone": "(21) 98766-5544",
              "gerencia": "BUZIOS/PGP/GIP",
              "genero": "MASC",
              "PDC": "NÃO"
            },
            {
              "nome": "Lorena Duarte Silva",
              "email": "lorena.silva@petrobras.com.br",
              "telefone": "(21) 98212-3434",
              "gerencia": "UN-ESP/OP-ESP/PROD-ESP",
              "genero": "FEM",
              "PDC": "Deficiência Auditiva"
            },
            {
              "nome": "Henrique Assis Oliveira",
              "email": "henrique.oliveira@petrobras.com.br",
              "telefone": "(21) 98555-6677",
              "gerencia": "UN-BUZ/ATP-BUZ-II/OP-FPSO-ALM-TAM",
              "genero": "MASC",
              "PDC": "NÃO"
            },
            {
              "nome": "Fernanda Albuquerque Matos",
              "email": "fernanda.matos@petrobras.com.br",
              "telefone": "(21) 98900-1122",
              "gerencia": "BUZIOS/PGP/GIP",
              "genero": "FEM",
              "PDC": "Deficiência Motora"
            },
            {
              "nome": "Alexandre Moura Ribeiro",
              "email": "alexandre.ribeiro@petrobras.com.br",
              "telefone": "(21) 98022-3344",
              "gerencia": "UN-RIO/OP-ESP/PROD-ESP",
              "genero": "MASC",
              "PDC": "NÃO"
            },
            {
              "nome": "Simone Pacheco Nunes",
              "email": "simone.nunes@petrobras.com.br",
              "telefone": "(21) 98333-4455",
              "gerencia": "UN-ES/ATP-ES-I/OP-FPSO-ATL-AB",
              "genero": "FEM",
              "PDC": "Deficiência Intelectual"
            }
          ],
        };
        setContas(data.contas);
        setLoading(false);
      }, 1000); // Simulando delay de 1 segundo
    };

    fetchData();
  }, []);


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
    <>
    <div className={`${montserrat.className} p-6 max-w-2xl mx-auto`}>
      <Link href="/painel" className="text-sm text-gray-500">&lt;&lt; Voltar</Link>
      
      <nav className="text-sm text-gray-500 mt-2">
        <Link href="/painel" className="text-blue-500">Painel de controle</Link> <span>&gt;</span> 
        <Link href="/gerenciar-evento" className="text-orange-500">Gerenciar contas</Link>
      </nav>

      {/* Título */}
      <h1 className="text-3xl font-bold mt-10 mb-4">Gerenciar contas</h1>

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
    </div>
    <div className="flex justify-center items-start min-h-screen bg-gray-200 pt-10">
      <div className="w-full max-w-[100%] md:max-w-[85%] p-4 overflow-auto">
        {loading ? (
          <p>Carregando dados...</p>
        ) : (
          <div className="overflow-x-auto">
            <TabelaDeContas contas={contas} />
          </div>
        )}
      </div>
    </div>
    </>
  );
}
