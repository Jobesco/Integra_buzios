"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Importação do useRouter
import { Card } from "@/components/ui/card";
import { Plus, FileText, Users, Settings, Edit, HelpCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Montserrat } from 'next/font/google';
import Image from "next/image";
import ic_admin from "@/public/admin.svg"
import ic_atv from "@/public/atividades.svg"
import ic_contas from "@/public/contas.svg"
import ic_dados from "@/public/dados.svg"
import ic_editFAQ from "@/public/editar_faqs.svg"
import ic_edit from "@/public/editar.svg"

const montserrat = Montserrat({
    weight: ['400', '700', '800'],
    subsets: ['latin'],
  });

const events = [
  { name: "IntegraBuzios 2025.2", status: "Evento ativo", active: true },
  { name: "IntegraBuzios 2025.1", status: "Evento finalizado", active: false },
  { name: "IntegraBuzios 2024.2", status: "Evento finalizado", active: false },
  { name: "IntegraBuzios 2024.1", status: "Evento finalizado", active: false },
];

const projectManagement = [
  { label: "Gerenciar atividades", icon: <Image className=" mr-2" src={ic_atv} alt="Local" width={16} height={16} />, route:"/atividades" },
  { label: "Editar gerências", icon: <Image className=" mr-2" src={ic_edit} alt="Local" width={16} height={16} />, route:"/gerencias" },
  { label: "Gerenciar contas", icon: <Image className=" mr-2" src={ic_contas} alt="Local" width={16} height={16} />, route:"/contas" },
  { label: "Dados do projeto", icon: <Image className=" mr-2" src={ic_dados} alt="Local" width={16} height={16} />, route:"dados" },
  { label: "Gerenciar administradores", icon: <Image className=" mr-2" src={ic_admin} alt="Local" width={16} height={16} />, route:"/admin" },
  { label: "Editar FAQ", icon: <Image className=" mr-2" src={ic_editFAQ} alt="Local" width={16} height={16} />, route:"/edit-faq" },
];

export default function Dashboard() {
  const router = useRouter(); // Instância do roteador


  return (
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
<h1 className={`${montserrat.className} text-3xl font-bold`}>Painel de controle</h1>

      <div className="mt-6 flex justify-between items-center">
        <h2 className={`${montserrat.className} text-xl font-semibold`}>Meus eventos</h2>
        <Button className="bg-[#0E39F7] !text-white hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
        >
          <Plus size={16} /> Criar Novo Evento
        </Button>
      </div>

      <ScrollArea className="mt-4 h-48 pr-2">
        {events.map((event, index) => (
          <div key={index} className="bg-surface flex justify-between items-center  p-4 rounded-lg mb-2">
            <div>
              <h3 className={`${montserrat.className} font-medium`}>{event.name}</h3>
              <div> {/* Envolvendo o conteúdo em um único elemento pai */}
                <div className="flex items-center">
                <span className={`w-2 h-2 ${event.active ? "bg-[#1eff00]" : "bg-error"}  rounded-full mr-2`}></span>
                <p className={`${montserrat.className} text-sm `}>{event.status}</p>
                </div>
            </div>
            </div>
            <Button                 className="bg-[#0E39F7] !text-white hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
            >Gerenciar</Button>
          </div>
        ))}
      </ScrollArea>

      <h2 className={`${montserrat.className} text-xl font-semibold mt-8`}>Gerenciamento de projeto</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {projectManagement.map((item, index) => (
          <Card 
          onClick={() => router.push(item.route)} // Redireciona ao clicar
          key={index} 
          className={`${montserrat.className} bg-surface p-4 flex items-center gap-2`}>
            <div className="flex flex-row my-4">
              {item.icon}
              <div className="flex flex-col">
                <span>{item.label}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
