"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Montserrat } from 'next/font/google';
import img from "@/public/dash-1.png";
import { Card, CardContent } from "@/components/ui/card";
import clsx from 'clsx';

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
    <Card className="p-4 w-full md:w-1/4">
      <CardContent>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">📍 {location}</p>
        <p className="text-sm text-gray-500">👤 {guide}</p>
        <p className="text-sm text-gray-500">✅ {status}</p>
        <p className="text-xl font-bold mt-2">{date}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="px-60 pt-20">
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

      <div className="flex mb-6">
        <Button
          onClick={() => handleTabChange('inscricoes')}
          variant={activeTab === 'inscricoes' ? 'default' : 'outline'}
          className="mr-4"
        >
          Minhas inscrições
        </Button>
        <Button
          onClick={() => handleTabChange('turmas')}
          variant={activeTab === 'turmas' ? 'default' : 'outline'}
        >
          Minhas turmas
        </Button>
      </div>

      {activeTab === 'inscricoes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {inscricoes.map((inscricao, index) => (
            <InscricaoCard
              key={index}
              {...inscricao}
            />
          ))}
        </div>
      )}

      <footer className="mt-8 text-sm text-gray-500">
        <p>FAQ</p>
        <a href="https://www.microsoftdocs.com.br/FAQ-Integra-Búzios" className="text-blue-500 underline">
          www.microsoftdocs.com.br/FAQ-Integra-Búzios
        </a>
      </footer>
    </div>
  );
};

export default Dashboard;