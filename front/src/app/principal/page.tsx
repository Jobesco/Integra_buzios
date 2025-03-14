"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Montserrat } from 'next/font/google';
import { Suspense } from "react";
import img from "@/public/dash-1.png";
import { Card, CardContent } from "@/components/ui/card";
import clsx from 'clsx';
import ShowSubsCard from './subscribes';



const montserrat = Montserrat({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('inscricoes');
  const [inscricoes, setInscricoes] = useState([]);
  const [user, setUser] = useState({ firstName: 'Admin', lastName: 'Silva' });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchInscricoes = async () => {
      const data = Array(6).fill({
        title: "Rapel de Santa Tereza",
        location: "Morro da Urca",
        guide: "João Grilo",
        date: "12 JAN",
        status: "✅ Confirmado"
      });
      setInscricoes(data);
    };

    fetchInscricoes();
  }, []);

  const InscricaoCard = ({ title, location, guide, date, status }) => (
    <Card className="p-4 w-full md:w-1/4 flex flex-col justify-between">
      <CardContent className="flex flex-col gap-2">
        <h3 className="text-base md:text-lg font-semibold line-clamp-2">{title}</h3>
        <p className="text-xs md:text-sm text-gray-500">📍 {location}</p>
        <p className="text-xs md:text-sm text-gray-500">👤 {guide}</p>
        <p className="text-xs md:text-sm text-gray-500">✅ {status}</p>
        <p className="text-lg md:text-xl font-bold mt-2">{date}</p>
      </CardContent>
    </Card>
  );

  return (
<div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 pt-20">
<h1 className={`${montserrat.className} text-4xl font-bold mb-8`}>Olá, {user.firstName} {user.lastName}!</h1>

      <Card className="rounded-2xl mb-8 overflow-hidden relative w-full h-[400px]">
        <Image
          src={img}
          alt="Feedback Background"
          fill
          className="object-cover"
        />
        <CardContent className="absolute inset-0 z-10 flex flex-col justify-center items-start p-8 text-white bg-black/70">
          <h2 className={`${montserrat.className} text-xl sm:text-4xl text-white-important font-bold mb-2 sm:mb-4 ml-[10px] sm:ml-[50px]`}>
            Vamos melhorar <br /> <span className="text-pink-important">a experiência do <br /> nosso Integra?</span>
          </h2>
          <p className="text-xs text-white-important sm:text-sm mb-2 sm:mb-4 ml-[10px] sm:ml-[50px]">Nos ajude preenchendo o formulário abaixo, clique e nos ajude com seu feedback!</p>
          <Button className="bg-[#F027F3] text-white-important px-3 py-1 sm:px-6 sm:py-2 rounded-full ml-[10px] sm:ml-[50px] text-xs sm:text-sm">
            Quero ajudar a melhorar o Integra
          </Button>
        </CardContent>
      </Card>

      <h2 className={`${montserrat.className} text-xl sm:text-4xl font-bold mb-2 sm:mb-4 pt-10`}>
          Minhas inscrições
          </h2>

      <div className="flex mb-6 justify-end">
      <Card className="bg-surface rounded-2xl ">
        <Button
          onClick={() => handleTabChange('inscricoes')}
          variant={activeTab === 'inscricoes' ? 'default' : 'outline'}
          className="bg-primary700 text-white-important hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
        >
          Minhas inscrições
        </Button>
        <Button
          onClick={() => handleTabChange('turmas')}
          variant={activeTab === 'turmas' ? 'default' : 'outline'}
          className={clsx(
            "bg-transparent", // Remove o fundo
            "shadow-none", // Remove sombras
            "hover:bg-transparent", // Remove o fundo ao passar o mouse
            "hover:border-none", // Remove as bordas ao passar o mouse
            "p-4", // Remove o padding interno
            "text-current", // Mantém a cor do texto atual
            activeTab === 'turmas' ? "font-bold" : "font-normal" // Adiciona negrito ao botão ativo
          )}
        >
          Minhas turmas
        </Button>
        </Card>
        
      </div>

      <section>
        <Suspense fallback={<p>Carregando inscrições...</p>}>
          <ShowSubsCard/>
        </Suspense>
      </section>

      <footer className="mt-8 mb-8 text-sm text-gray-500">
        <p>FAQ</p>
        <a href="https://www.microsoftdocs.com.br/FAQ-Integra-Búzios" className="text-blue-500 underline">
          www.microsoftdocs.com.br/FAQ-Integra-Búzios
        </a>
      </footer>
    </div>
  );
};

export default Dashboard;