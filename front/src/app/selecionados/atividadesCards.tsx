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
import AddMemberModal from "./addMembro";
import ConfirmationModal from "./modalEnviado";
import ExcluirModal from "./excluirInscricao";
import Modal from "../painel/addAtividade";

export default function AtividadesCard({ onChoose, ...props }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [nameToDelete, setNameToDelete] = useState("");
  const checkExists = props.check !== undefined; // Verifica se props.check existe
  const gerente = props.gerente !== undefined;
  const [selectedManager, setSelectedManager] = useState(null);

  const handleManagerSelection = (participantName) => {
    setEventData((prevData) => ({
      ...prevData,
      participants: prevData.participants.map((participant) => ({
        ...participant,
        isManager: participant.name === participantName, // Apenas um pode ser true
      })),
    }));
    onChoose?.(participantName);
    setSelectedManager(participantName);
  };

  const [eventData, setEventData] = useState({
    id: props.id,
    title: props.title,
    subtitle: props.subtitle,
    participants: props.participants,
    status: props.status,
    iconType: props.iconType,
    check: checkExists ? props.check : false, // Se props.check existe, usa ele; senão, usa false
    ...(props.emEspera?.trim() && { emEspera: props.emEspera }), // Adiciona somente se não for vazio
    gerente: gerente ? props.gerente : false,
  });

  const handleAddParticipant = (newParticipant) => {
    console.log(newParticipant.title)
    setEventData((prevData) => ({
      ...prevData,
      participants: [...prevData.participants, { name: newParticipant.title, highlighted: false }],
    }));
  };
  

  const handleRemoveParticipant = (participantName) => {
    setEventData((prevData) => ({
      ...prevData,
      participants: prevData.participants.filter(p => p.name !== participantName)
    }));
  };
  
  const [modalConfirm, setModalConfirm] = useState(false);
  const [addAtividade, setAddAtividade] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  const renderIcon = (iconType, name) => {
    switch (iconType) {
      case "selecionados":
        return <Image onClick={() => {
          setNameToDelete(name);
          setModalExcluir(true);
        }}
        src={ic_trash} alt="Excluir" width={28} height={28} />;
      case "voluntarios":
        return <><Image className="mr-2" src={ic_eye} alt="Visualizar" width={28} height={28} /><Image className="mr-4" src={ic_ok} alt="Excluir" width={28} height={28} /></>;
      case "participantes":
        return <><Image className="mr-2" src={ic_eye} alt="Visualizar" width={28} height={28} /><Image 
        className="mr-4"  
        onClick={() => {
            setNameToDelete(name);
            setModalExcluir(true);
          }} src={ic_trash} alt="Excluir" width={28} height={28} /></>;
      case "atividades":
        return <><Image className="mr-2" src={ic_edit_evento} alt="Editar" width={28} height={28} /><Image className="mr-4" 
        onClick={() => {
          setNameToDelete(name);
          setModalExcluir(true);
        }} src={ic_trash} alt="Excluir" width={28} height={28} /></>;
      default:
        return null; // Caso não tenha um tipo definido, não renderiza nada
    }
  };

  const renderStatusText = () => {
    switch (eventData.status) {
      case "Grupo aprovado":
        return <span className="text-success font-bold">✔ Grupo aprovado</span>;
  
      case "Aguardando aprovação":
        return <span className="text-[#FF9F1C] font-bold">Aguardando aprovação</span>;
  
      case "Inscrições insuficientes":
        return <span className="text-error font-bold">✖ Inscrições insuficientes</span>;
  
      default:
        return null; // Caso não tenha status correspondente, não exibe nada
    }
  };
  

  const renderButtons = () => {
    switch (eventData.status) {
      case "Grupo aprovado":
        return (
          <Button disabled
          variant="outline" 
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
          <Button 
          disabled
          variant="outline" 
          className="rounded-full bg-white border-2 border-error text-error">
            Insuficiente
          </Button>
        );

      case "Enviar para seleção":
        return (
          <Button variant="outline" 
          onClick={() => setModalConfirm(true)}
          className="rounded-full bg-[#0E39F7] text-white-important">
            Enviar para seleção
          </Button>
        );

      case "Adicionar atividade":
        return (
          <Button variant="outline" 
          onClick={() => setAddAtividade(true)}
          className="rounded-full bg-[#0E39F7] text-white-important">
            Adicionar atividade
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
    <Card className="p-6 border rounded-lg w-full">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-bold text-blue-900">{eventData.title}</h3>
        {checkExists && (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={eventData.check}
            onChange={() => 
              setEventData((prevData) => ({
                ...prevData,
                check: !prevData.check, // Inverte o valor de check
              }))
            }
            className="w-5 h-5 border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-700 font-medium">{eventData.emEspera}</span>
        </label>)}
      </div>

      <p className="text-sm text-gray-500">{eventData.subtitle}</p>
      <ScrollArea className="mt-4 max-h-40 overflow-y-auto border rounded-md">
      {eventData.participants.map((participant, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-3 rounded-md mt-1 mx-2 ${
            participant.highlighted ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          {/* Checkbox Redondo */}
          <div className="flex items-center gap-2">
          {eventData.gerente && (
              <input
              type="checkbox"
              className="w-5 h-5 accent-blue-600 rounded-full border-gray-400 focus:ring focus:ring-blue-300"
              checked={participant.isManager || false}            
              onChange={() => handleManagerSelection(participant.name)}
              
            />
            )}
            <span>{participant.name}</span>
          </div>

          {/* Botão de ação */}
          <Button variant="ghost" size="icon">
            {renderIcon(eventData.iconType, participant.name)}
          </Button>
        </div>
      ))}
    </ScrollArea>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-green-600 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
          {renderStatusText()}
        </span>
        <div className="flex gap-2">
          
          {eventData.iconType == "selecionados" || eventData.iconType == "atividades"  && (<Button 
            onClick={()=>(setModalOpen(true))}
            className="bg-primary900 text-white-important px-3 py-1 sm:px-6 sm:py-2 rounded-full ml-[10px] sm:ml-[50px] text-xs sm:text-sm"
          variant="outline">
            <UserPlus className="h-4 w-4" />
          </Button>)}

          {eventData.iconType == "selecionados" || eventData.iconType == "participantes" && (
            <>{renderButtons()}</>
          )}

        </div>
      </div>
      
      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        eventData={eventData}
        setEventData={setEventData}
      />

      <ConfirmationModal
        isOpen={modalConfirm}
        onClose={() => setModalConfirm(false)}
       />
      
      <ExcluirModal
        name={nameToDelete}
        isOpen={modalExcluir}
        onClose={() => setModalExcluir(false)}
        onDelete={handleRemoveParticipant} // Nova função passada para o modal
      />

      <Modal
        isOpen={addAtividade}
        onClose={()=> setAddAtividade(false)}
        onSuccess={handleAddParticipant}
      />

    </Card>
  );
}
