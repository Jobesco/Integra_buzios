import Link from "next/link";
import Image  from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"
import { Suspense } from "react";
import Dialogger from "./dialogger";
import ExploreCardPage from "./explore-card";
import HomeCard from "./home-cards"
import { Montserrat } from 'next/font/google';
import img from "@/public/banner.png"
import clsx from 'clsx'; // para mesclar classes
import ShowComentarioCard, { ComentarioCard } from "./comentario-card";

const montserrat = Montserrat({
  weight: ['400', '700', '800'], // Escolha os pesos que deseja utilizar
  subsets: ['latin'],
});

export default async function Home() {

  

  
  return (
    <>
    <div
      className="w-full text-white shadow-lg relative overflow-hidden"
      style={{
        borderBottomLeftRadius: '4rem',
        borderBottomRightRadius: '4rem',
        backgroundImage: `url(${img.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '500px', // Altura reduzida
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="container mx-auto p-8 flex flex-col md:flex-row items-center justify-between relative z-10 h-full">
        <div className="flex flex-col space-y-4 md:w-1/2">
        <h1 className={clsx(montserrat.className, "text-4xl text-white-important font-extrabold tracking-tight lg:text-5xl relative z-10")}>
        Une,
          </h1>
          <h1 className={clsx(montserrat.className, "text-4xl text-white-important font-extrabold tracking-tight lg:text-5xl")}>
            Conecta,
          </h1>
          <h1 className={clsx(montserrat.className, "text-4xl font-extrabold tracking-tight lg:text-5xl text-[#FF9F1C]")}>
            Integra.
          </h1>
          <p className="text-lg text-white-important">
            O Integra é um evento que cria conexões entre as diferentes gerências através de atividades que promovem o bem-estar.
          </p>
          <Link href="/cadastro">
            <Button className="bg-[#FF9F1C] !text-white hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300">
              Cadastre-se
            </Button>
          </Link>
        </div>

        {/* Espaço reservado para a imagem (opcional) */}
        <div className="md:w-1/2 mt-8 md:mt-0"></div>
      </div>
    </div>
    <div className="container mx-auto p-4">  
      {/* Seção de Cards */}
      <section>
        <h2 className={clsx(montserrat.className, "text-2xl py-8  font-semibold mb-2")}>Por que participar do Integra?</h2>
        <Suspense fallback={<p>Carregando artigos...</p>}>
          <HomeCard />
        </Suspense>
      </section>

      <section>
        <h2 className={clsx(montserrat.className, "text-2xl py-8  font-semibold mb-2")}>Por que participar do Integra?</h2>
        <Suspense fallback={<p>Carregando artigos...</p>}>
          <ShowComentarioCard/>
        </Suspense>
      </section>

      <Separator className="my-6" />

      {/* Outra Seção */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">FAQ</h2>
        <Link href="/wwww.microsoftdocs.com.br/FAQ-Integra-Búzios" className="text-blue-500 hover:underline">
        wwww.microsoftdocs.com.br/FAQ-Integra-Búzios
        </Link>
      </section>

      {/* Dialogger (Modal ou Formulário) */}
      <Dialogger />
    </div>
    </>
  );
}