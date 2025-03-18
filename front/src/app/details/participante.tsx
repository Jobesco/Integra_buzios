import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Montserrat } from "next/font/google";

import ActivityGrid from "./atividades";
import React from "react";
import ConfirmationModal from "./confirmacao";


const montserrat = Montserrat({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

export default function ParticipanteGuideForm(props: any) {
  const [formData, setFormData] = useState({
    onVacation: "",
    availableDates: [],
    selectedActivities: [],
    acceptedTerms: false,
  });

  const [showReview, setShowReview] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...(prev[name] as string[]), value]
        : (prev[name] as string[]).filter((item) => item !== value),
    }));
  };

  const handleActivitySelection = (selectedActivities: string[]) => {
    setFormData((prev) => ({
      ...prev,
      selectedActivities,
    }));
  };

  const handleReview = () => {
    if (!formData.acceptedTerms) {
      alert("Você precisa aceitar os termos antes de continuar.");
      return;
    }
    setShowReview(true);
  };

  return (
    <>
    {/* Link de Voltar */}
    {showReview &&
    <div className="text-sm text-gray-600 cursor-pointer hover:underline">
       <a onClick={()=>(setShowReview(false))} >&lt;&lt; Voltar</a> 
      </div>
    }

      <p className="text-sm text-gray-600 mt-10">
        <span><a href="/principal">Página Inicial</a></span>{" "}
        <span className="text-blue-600 font-semibold"> &gt; {props.title}</span>
      </p>
      <div className="mx-auto">
        <h1 className={`${montserrat.className} text-5xl font-bold my-6`}>
        Participe do {props.title}!
        </h1>
        <p className={`${montserrat.className} text-sm my-6`}>
        Ao se inscrever como guia, você terá a chance de compartilhar seu conhecimento, ajudar os participantes e viver a experiência de um evento incrível. Seu apoio é fundamental para criar momentos inesquecíveis!
        Inscreva-se agora e junte-se a nós nessa jornada!
        </p>

        {!showReview ? (
          <>
            {/* Perguntas do Formulário */}
            <div className="mt-6">
              <h2 className={`${montserrat.className} text-2xl font-semibold`}>
                Você estará de férias durante o período do evento?
              </h2>
              <div className="mt-2 flex gap-4">
                <label>
                  <input type="radio" name="onVacation" value="Sim" onChange={handleChange} /> Sim
                </label>
                <label>
                  <input type="radio" name="onVacation" value="Não" onChange={handleChange} /> Não
                </label>
              </div>
            </div>

            {/* Datas Disponíveis */}
            <div className="mt-6">
              <h2 className={`${montserrat.className} text-2xl font-semibold`}>
                Selecione as datas que você está disponível
              </h2>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {props.availableDates?.map((date: string) => (
                  <label key={date} className="flex items-center gap-2">
                    <input type="checkbox" name="availableDates" value={date} onChange={handleCheckboxChange} /> {date}
                  </label>
                ))}
              </div>
            </div>

            {/* Atividades */}
            <div className="mt-6">
              <h2 className={`${montserrat.className} text-xl font-semibold`}>
                Selecione as atividades que você quer ser guia
              </h2>
              <ActivityGrid
                activities={props.activities}
                selectedActivities={formData.selectedActivities}
                onActivityChange={(activity, checked) => {
                    setFormData((prev) => ({
                    ...prev,
                    selectedActivities: checked
                        ? [...prev.selectedActivities, activity]
                        : prev.selectedActivities.filter((item) => item !== activity),
                    }));
                }}
                />            
            </div>

            {/* Termo de Participação */}
            <h2 className={`${montserrat.className} text-xl font-semibold mt-10`}>
              Termo de participação como Guia Voluntário
            </h2>
            <div className="mt-6 flex items-center gap-2">
              <input
                type="checkbox"
                name="acceptedTerms"
                onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
              />
              <label>Declaro que li e aceito o Termo de Participação como Guia Voluntário</label>
            </div>

            {/* Botão de Revisão */}
            <div className="mt-16 my-14 flex justify-center">
              <Button
                className="bg-[#0E39F7] !text-white hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
                onClick={handleReview}
              >
                Revisar Inscrição
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Revisão dos Dados */}
            <h2 className={`${montserrat.className} text-3xl font-semibold my-8`}>
              Confirmação da Inscrição
            </h2>
            <p className="text-lg">
              <strong>Estará de férias?</strong> {formData.onVacation || "Não informado"}
            </p>
            <p className="text-lg">
              <strong>Datas disponíveis:</strong> {formData.availableDates.length > 0 ? formData.availableDates.join(", ") : "Nenhuma selecionada"}
            </p>
            <p className="text-lg">
              <strong>Atividades selecionadas:</strong> {formData.selectedActivities.length > 0 ? formData.selectedActivities.join(", ") : "Nenhuma selecionada"}
            </p>
            <p className="text-lg">
              <strong>Termos aceitos?</strong> {formData.acceptedTerms ? "Sim" : "Não"}
            </p>

            {/* Botão para Editar */}
            <div className="mt-6 flex justify-center">
              <Button
                className="bg-[#FF9F1C] !text-white hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
                onClick={() => setShowReview(false)}
              >
                Confirmar Inscrição
              </Button>
            </div>
          </>
        )}
      </div>

      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </>
  );
}
