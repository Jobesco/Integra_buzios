import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, UserPlus, Trash2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import ic_eye from "@/public/eye.svg"
import ic_ok from "@/public/ok.svg"
import ic_trash from "@/public/trash.svg"
import ic_trash_negative from "@/public/trash_negative.svg"
import ic_edit_evento from "@/public/edit_evento.svg"

export default function AtividadesCard(props:any) {

  const [eventData, setEventData] = useState({
    title: props.title,
    subtitle: props.subtitle,
    participants: props.participants,
    status: props.status,
    iconType: props.iconType,
  });

  const renderIcon = (iconType) => {
    switch (props.iconType) {
      case "selecionados":
        return <Image src={ic_trash} alt="Excluir" width={28} height={28} />;
      case "voluntarios":
        return <><Image className="mr-2" src={ic_eye} alt="Visualizar" width={28} height={28} /><Image src={ic_ok} alt="Excluir" width={28} height={28} /></>;
      case "participantes":
        return <><Image className="mr-2" src={ic_eye} alt="Visualizar" width={28} height={28} /><Image src={ic_trash} alt="Excluir" width={28} height={28} /></>;
      case "atividades":
        return <><Image className="mr-2" src={ic_edit_evento} alt="Editar" width={28} height={28} /><Image src={ic_trash} alt="Excluir" width={28} height={28} /></>;
      default:
        return null; // Caso não tenha um tipo definido, não renderiza nada
    }
  };

  const renderButtons = () => {
    switch (eventData.status) {
      case "Grupo aprovado":
        return (
          <Button variant="outline" 
          className="rounded-full bg-white border-2 border-success text-success">
            <Check className="h-4 w-4" />
          </Button>
        );
  
      case "Aguardando aprovação":
        return (
          <>
            <Button variant="outline" 
          className="rounded-full bg-[#0E39F7] text-white-important">
              Aprovar
            </Button>
          </>
        );
  
      case "Inscrições insuficientes":
        return (
          <Button variant="outline" 
          className="rounded-full bg-white border-2 border-error text-error">
            Insuficiente
          </Button>
        );

      case "Enviar para seleção":
        return (
          <Button variant="outline" 
          className="rounded-full bg-[#0E39F7] text-white-important">
            Enviar para seleção
          </Button>
        );
  
      default:
        return null; // Caso não tenha nenhum status correspondente, não exibe botões
    }
  };  

  const handleEditSuccess = (updatedEvent) => {
    console.log("Evento atualizado:", updatedEvent);
    setEventData(updatedEvent); // Atualiza o estado com os novos valores
  };

  return (
    <Card className="p-4 border rounded-lg w-full max-w-md">
      <h3 className="text-lg font-bold text-blue-900">{eventData.title}</h3>
      <p className="text-sm text-gray-500">{eventData.subtitle}</p>
      <ScrollArea className="mt-4 max-h-40 overflow-y-auto border rounded-md">
        {eventData.participants.map((participant, index) => (
          <div
            key={index}
            className={`flex bg-surface justify-between items-center p-3 ${
              participant.highlighted ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-700"
            } rounded-md mt-1 mx-2`}
          >
            <span>{participant.name}</span>
            <Button variant="ghost" size="icon">{renderIcon(eventData.iconType)}</Button>

          </div>
        ))}
      </ScrollArea>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-green-600 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
          {eventData.status}
        </span>
        <div className="flex gap-2">
          <Button 
            className="bg-primary900 text-white-important px-3 py-1 sm:px-6 sm:py-2 rounded-full ml-[10px] sm:ml-[50px] text-xs sm:text-sm"
          variant="outline">
            <UserPlus className="h-4 w-4" />
          </Button>

          {renderButtons()}

        </div>
      </div>
    </Card>
  );
}
