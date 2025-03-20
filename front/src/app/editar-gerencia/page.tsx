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
  const [searchGerente, setSearchGerente] = useState<string[]>([">"]);
  const handleChoose = (participantName: string) => {
    setSearchGerente((prev) => {
      console.log("Antes do handleChoose:", prev);
  
      if (prev.length === 0) {
        console.log("Array vazio, adicionando:", participantName);
        return [participantName];
      }
  
      const updated = [...prev.slice(0, -1), participantName];
      console.log("Após remoção do último e adição do novo:", updated);
  
      return updated;
    });
  
    console.log("searchGerente após set:", searchGerente);
    concatenateWithArrow();
  };
  
  const concatenateWithArrow = () => {
    console.log("Concatenando com '>'...");
    setSearch(searchGerente.join(">"));
    console.log("Resultado da concatenação:", search);
  };
  
  const handleNext = () => {
    setSearchGerente((prevItems) => {
      console.log("Antes do handleNext:", prevItems);
  
      if (prevItems[prevItems.length - 1] === "") {
        console.log("O último item é '.', não adicionando.");
        return prevItems;
      }
  
      const updated = [...prevItems, ""];
      console.log("Após adicionar '.':", updated);
  
      return updated;
    });
  
    concatenateWithArrow();
  };
  
  const handlePrevious = () => {
    setSearchGerente((prevItems) => {
      console.log("Antes do handlePrevious:", prevItems);
  
      const updated = prevItems.slice(0, -1);
      console.log("Após remover o último item:", updated);
  
      return updated;
    });
  
    concatenateWithArrow();
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
      gerente:true,
    },
    // Adicione mais objetos conforme necessário
  );

  const handleDelete = (id: number) => {
    setGerencias(gerencias.filter((g) => g.id !== id));
  };

  const [componentKey, setComponentKey] = useState(0);

  const resetComponent = () => {
    setComponentKey((prevKey) => prevKey + 1); // Incrementa a chave, forçando a reinicialização
  };

  // Função para resetar e adicionar novos participantes
  const setNewParticipants = (newParticipants) => {
    setAtividades((prevState) => ({
      ...prevState,
      participants: newParticipants.map((name) => ({ name, highlighted: false })),
    }));
    resetComponent(); // Força a reinicialização após atualização
  };

  const fetchFakeData_next = () => {
    // atualizar os gerentes no card
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Dados carregados da API fake!");
      handleNext();
      // Exemplo de uso:
      setNewParticipants(["Participante A", "Participante B", "Participante C"]);

    }, 1000); // Simula um delay de 1 segundo

  };

  const fetchFakeData_previous = () => {
     // atualizar os gerentes no card
    setLoading(true);
    setTimeout(() => {
    setLoading(false);
    console.log("Dados carregados da API fake!");
    handlePrevious();
    // Exemplo de uso:
    setNewParticipants(["Participante C", "Participante D", "Participante E"]);
    }, 1000); // Simula um delay de 1 segundo

  };

  

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
        <Link href="/gerenciar-evento" className="text-orange-500">Editar Gerências</Link>
      </nav>

      {/* Título */}
      <h1 className="text-3xl font-bold mt-10 mb-4">Editar Gerências</h1>

      {/* Barra de Pesquisa */}
      <div className="relative mb-4 mt-7">
        <Input
          placeholder="Pesquisar gerências"
          className="pl-8" // Espaçamento para o ícone
          value={searchGerente.join(">")}
          onChange={handleSearchChange}
        />
        <Search className="absolute right-2 top-2 text-gray-400 w-4 h-4" />
      </div>

      {/* Voltar e Avançar */}
      <div className="flex mt-10 justify-between text-sm text-gray-600 mb-4">
        <Button
          variant="outline"
          onClick={fetchFakeData_previous}
          disabled={loading}
          className="flex items-center"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "« Voltar"}
        </Button>
        <Button
          variant="outline"
          onClick={fetchFakeData_next}
          disabled={loading}
          className="flex items-center"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Avançar »"}
        </Button>
      </div>
      
      {/* Lista de Gerências */}
    
      <div className="flex items-center justify-between p-4 mb-2">
        
        <AtividadesCard 
            key={componentKey}  // A chave única para forçar a reinicialização

        {...atividades}
        onChoose={handleChoose} 
          />
      </div>
    </div>
  );
}
