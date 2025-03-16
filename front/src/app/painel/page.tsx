"use client";

import { Montserrat } from 'next/font/google';
import Dashboard from './dashboard';
import CreateEvent from './novoEvento';
import ManageEvent from './genreciarEvento';


const montserrat = Montserrat({
    weight: ['400', '700', '800'],
    subsets: ['latin'],
  });



export default function Main() {
    const showDash = false
  return (
    <>
    {/* {showDash ? (
        <Dashboard/>
    ):(
        <div className={`${montserrat.className} p-8 max-w-2xl mx-auto`}>
        <a href="/dashboard" className="text-sm text-gray-600 hover:underline">
        {"<< Voltar"}
      </a>
            <CreateEvent/>
            </div>
    )} */}

        <ManageEvent/>

    </>
  );
}
