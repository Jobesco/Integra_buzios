"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlarmClock, MapPin, User } from "lucide-react";
import ShowDetailsComponent from "./event";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    weight: ['400', '700', '800'],
    subsets: ['latin'],
  });

  
export default function EventDetails() {

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Link de Voltar */}
      <div className="text-sm text-gray-600 cursor-pointer hover:underline">
       <a  href="/principal">&lt;&lt; Voltar</a> 
      </div>
      <ShowDetailsComponent/>
    </div>
  );
}
