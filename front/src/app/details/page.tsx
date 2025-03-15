"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlarmClock, MapPin, User } from "lucide-react";
import ShowDetailsComponent from "./event";
import VolunteerGuideForm from "./voluntario";

import { Montserrat } from 'next/font/google';
import ParticipanteGuideForm from "./participante";

const montserrat = Montserrat({
    weight: ['400', '700', '800'],
    subsets: ['latin'],
  });

  
export default function EventDetails() {
  
  // use isso para mostrar o componente desejado
  const volunteerGuide = true


  return (
    <div className="max-w-5xl mx-auto p-6">
      {volunteerGuide ? (
      <VolunteerGuideForm
        title="Inscrição Guia Voluntário"
        availableDates={["16/06", "17/06", "18/06", "19/06", "20/06", "23/06", "24/06"]}
        activities={[
          { name: "Rappel de Santa Tereza", location: "Santa Tereza" },
          { name: "Tour Heranças Africanas", location: "Centro Histórico" },
          { name: "Canoa Havaiana", location: "Lagoa Rodrigo de Freitas" },
          { name: "Plantar floresta", location: "Morro da Urca" },
          { name: "Surf", location: "Baía de Guanabara" },
          { name: "Mergulho", location: "Baía Formosa" },
          { name: "Escalada Pão de Açúcar", location: "Pão de Açúcar" },
          { name: "Tour Gastronômico Lapa", location: "Lapa" },
        ]}/> ) :(
      <ParticipanteGuideForm
      title="IntegraBÚZIOS 2025.1"
      availableDates={["16/06", "17/06", "18/06", "19/06", "20/06", "23/06", "24/06"]}
      activities={[
        { name: "Rappel de Santa Tereza", location: "Santa Tereza" },
        { name: "Tour Heranças Africanas", location: "Centro Histórico" },
        { name: "Canoa Havaiana", location: "Lagoa Rodrigo de Freitas" },
        { name: "Plantar floresta", location: "Morro da Urca" },
        { name: "Surf", location: "Baía de Guanabara" },
        { name: "Mergulho", location: "Baía Formosa" },
        { name: "Escalada Pão de Açúcar", location: "Pão de Açúcar" },
        { name: "Tour Gastronômico Lapa", location: "Lapa" },
      ]}/>)}
      
    </div>
  );
}
