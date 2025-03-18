import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ic_edit from "@/public/edit_evento.svg"
import { useState } from "react";
import EditEventModal from "./editEvento";
import { parse, isValid , format} from "date-fns";


const montserrat = Montserrat({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});


export default function EventManagement(props :any) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (openModal : boolean) => {
        setIsModalOpen(openModal)
    }

    const [eventData, setEventData] = useState({
        title: props.title,
        startDate: props.startDate,
        endDate: props.endDate,
      });

      const handleEditSuccess = (updatedEvent) => {
        console.log("Evento atualizado:", updatedEvent);
        setEventData(updatedEvent); // Atualiza o estado com os novos valores
      };
  return (
    <div className={`${montserrat.className} p-6 max-w-4xl mx-auto`}>      
     <a href="#" className="text-sm text-gray-500">&lt;&lt; Voltar</a>
      <p className="text-gray-500 text-sm mt-10">
        <span className="text-blue-600">Painel de controle</span> &gt; Gerenciar evento &gt; <span className="text-blue-600">{eventData.title}</span>
      </p>

      <h1 className="text-3xl mt-10 font-extrabold text-left">Gerenciar evento</h1>
      <div className="flex items-center gap-2 mt-10">
        <h2 className="text-2xl font-bold text-left">{eventData.title}</h2>
        <Image 
            onClick={() => setIsModalOpen(true)}
            className="mr-2" src={ic_edit} alt="editar" width={28} height={28} />
      </div>
      
      <p className="text-left mt-2">Data de início: {eventData.startDate}</p>
      <p className="text-left">Data de término: {eventData.endDate}</p>
      
      <div className="mt-10">
        <h3 className="text-xl font-bold text-left">Selecionados</h3>
        <Link href="/select">
        <Button 
          className="bg-primary900 mt-7 !text-white  hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
          >
          Lista dos selecionados
        </Button>
        </Link>
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
        {props.ended ? (
            <Button disabled
            className="border-2 border-error bg-white mt-7 !text-error  hover:!bg-white rounded-full px-6 py-2 transition-colors duration-300"
          >
                Evento finalizado
            </Button>
        ):(
            <Button 
            href="google.com"
            className="border-2 border-error bg-error mt-7 !text-white  hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
            >
            Finalizar evento
          </Button>
            
        )}
        
      </div>

      <EditEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleEditSuccess}
        event={eventData}
      />
    </div>
  );
}