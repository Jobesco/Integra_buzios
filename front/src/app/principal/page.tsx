"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Montserrat } from 'next/font/google';
import { Suspense } from "react";
import img from "@/public/dash-1.png";
import img2 from "@/public/dash-2.png";
import { Card, CardContent } from "@/components/ui/card";
import clsx from 'clsx';
import ShowSubsCard from './subscribes';



const montserrat = Montserrat({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

const Dashboard = () => {
  const [showButton, setShowButton] = useState(false); // Estado inicial
  const [activeTab, setActiveTab] = useState('inscricoes');
  const [inscricoes, setInscricoes] = useState([]);
  const [user, setUser] = useState({ firstName: 'Admin', lastName: 'Silva' });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleClick = (isActive) => {
    if (isActive) {
      console.log("O botão está ativo!");
    } else {
      console.log("Quero ajudar a melhorar o Integra");
    }
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

  return (
<div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 pt-20">
<h1 className={`${montserrat.className} text-4xl font-bold mb-8`}>Olá, {user.firstName} {user.lastName}!</h1>
      {showButton ? (

        <Card className="rounded-2xl mb-8 overflow-hidden relative w-full h-[400px]">
        <Image
          src={img2}
          alt="Feedback Background"
          fill
          className="object-cover"

            

        />
        <CardContent className="absolute inset-0 z-10 flex flex-col justify-center items-start p-8 text-white bg-black/70">
          <h2 className={`${montserrat.className} text-xl sm:text-4xl text-primary900 font-bold mb-2 sm:mb-4 ml-[10px] sm:ml-[50px]`}>
          Chegou a hora <br /> <span className="text-primary-important">de participar <br /> do Integra.</span>
          </h2>
          <p className="text-xs text-primary900 sm:text-sm mb-2 sm:mb-4 ml-[10px] sm:ml-[50px]">Formulário aberto para participar, clique abaixo e se inscreva em uma atividade.</p>
          <Button onClick={() => handleClick(showButton)}
          className="bg-[#0E39F7] text-white-important px-3 py-1 sm:px-6 sm:py-2 rounded-full ml-[10px] sm:ml-[50px] text-xs sm:text-sm">
            Eu quero participar!
          </Button>
        </CardContent>
        </Card>

      ):(
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
          <Button onClick={() => handleClick(showButton)}
           className="bg-[#F027F3] text-white-important px-3 py-1 sm:px-6 sm:py-2 rounded-full ml-[10px] sm:ml-[50px] text-xs sm:text-sm">
            Quero ajudar a melhorar o Integra
          </Button>
        </CardContent>
      </Card>
      )}

      <h2 className={`${montserrat.className} text-xl sm:text-4xl font-bold mb-2 sm:mb-4 pt-10`}>
          Minhas inscrições
          </h2>

      <div className="flex mb-6 justify-end">
      <Card className="bg-surface rounded-2xl ">
      <Button
          onClick={() => setShowButton(false)}
          className={clsx(
            "rounded-full px-6 py-2 transition-colors duration-300",
            showButton
              ? "bg-transparent text-primary700 hover:bg-primary700 hover:text-white-important"
              : "bg-primary700 text-white-important hover:bg-primary600"
          )}
        >
          Minhas inscrições
        </Button>

        <Button
          onClick={() => setShowButton(true)}
          className={clsx(
            "rounded-full px-6 py-2 transition-colors duration-300",
            !showButton
              ? "bg-transparent text-primary700 hover:bg-primary700 hover:text-white-important"
              : "bg-primary700 text-white-important hover:bg-primary600"
          )}
        >
          Minhas turmas
        </Button>
        </Card>
        
      </div>

      <section>
        <Suspense fallback={<p>Carregando inscrições...</p>}>
          <ShowSubsCard showButton={showButton} />
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