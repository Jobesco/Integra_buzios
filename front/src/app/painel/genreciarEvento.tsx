import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";

const montserrat = Montserrat({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

export default function EventManagement() {
  return (
    <div className={`${montserrat.className} p-6 max-w-4xl mx-auto`}>      
     <a href="#" className="text-sm text-gray-500">&lt;&lt; Voltar</a>
      <p className="text-gray-500 text-sm mt-10">
        <span className="text-blue-600">Painel de controle</span> &gt; Gerenciar evento &gt; <span className="text-blue-600">IntegraBuzios2025.1</span>
      </p>

      <h1 className="text-3xl mt-10 font-extrabold text-left">Gerenciar evento</h1>
      <h2 className="text-2xl font-bold text-left mt-9">IntegraBuzios 2025.2</h2>
      
      <p className="text-left mt-2">Data de início: 14/01/2025</p>
      <p className="text-left">Data de término: 22/02/2025</p>
      
      <div className="mt-10">
        <h3 className="text-xl font-bold text-left">Selecionados</h3>
        <Button 
          className="bg-primary900 mt-7 !text-white  hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
          >
          Lista dos selecionados
        </Button>
      </div>
      
      <div className="mt-10">
        <h3 className="text-xl font-bold text-left">Formulários</h3>
        <div className="flex flex-wrap gap-4 mt-4">
          <Button 
          className="bg-primary900 mt-7 !text-white  hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
          >
            Guias voluntários
          </Button>
          <Button 
          className="bg-primary900 mt-7 !text-white  hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
          >
            Participantes
          </Button>
          <Button 
          className="bg-primary900 mt-7 !text-white  hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
          >
            Feedback
          </Button>
        </div>
      </div>
      
      <div className="mt-10">
        <Button 
          className="bg-error mt-7 !text-white  hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
          >
          Finalizar evento
        </Button>
      </div>
    </div>
  );
}