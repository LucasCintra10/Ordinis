"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import * as Icon from "@heroicons/react/24/outline";
import Accordion from "@/components/Accordion";
import TransitionEffect from "@/components/TransitionEffect";

export default function HelpPage() {
  const [display, setDisplay] = React.useState("home");
  const [isShowing, setIsShowing] = React.useState(true);

  const HomeSection = () => {
    return (
      <section className="w-full flex flex-col gap-3">
        <Accordion
          title="Relátorio dos Patrimônios"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        />
        <Accordion
          title="Informações do Patrimônio"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        />
        <Accordion
          title="Mover Patrimônio"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        />
        <Accordion
          title="Manutenções Pendentes"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        />
        <Accordion
          title="Patrimônios Danificados"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        />
      </section>
    );
  };

  return (
    <>
      <main className="w-screen h-screen flex justify-center items-center">
        <Image src="/vectorBR.svg" alt="Ilustração" width={400} height={400} className="absolute bottom-0 right-0" />
        <Navbar />
        <div className="w-full h-full flex flex-col ml-8">
          <div className="w-[50%] h-1/6 flex items-center">
            <h1 className="text-5xl font-bold text-c5 ">Ajuda</h1>
          </div>
          <div className="w-[95%] flex gap-4">
            <button
              className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
                display === "home" ? "bg-c4 text-c2" : "bg-c2 text-c5"
              }`}
              onClick={() => setDisplay("home")}
            >
              <Icon.HomeIcon className="w-5 h-5" />
              Home
            </button>
            <button
              className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
                display === "patrimonio" ? "bg-c4 text-c2" : "bg-c2 text-c5"
              }`}
              onClick={() => setDisplay("patrimonio")}
            >
              <Icon.ArchiveBoxIcon className="w-5 h-5" />
              Patrimônio
            </button>
            <button
              className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
                display === "manutencao" ? "bg-c4 text-c2" : "bg-c2 text-c5"
              }`}
              onClick={() => setDisplay("manutencao")}
            >
              <Icon.WrenchScrewdriverIcon className="w-5 h-5" />
              Manutenção
            </button>
            <button
              className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
                display === "relatorios" ? "bg-c4 text-c2" : "bg-c2 text-c5"
              }`}
              onClick={() => setDisplay("relatorios")}
            >
              <Icon.DocumentTextIcon className="w-5 h-5" />
              Relatórios
            </button>
            <button
              className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
                display === "configuracoes" ? "bg-c4 text-c2" : "bg-c2 text-c5"
              }`}
              onClick={() => setDisplay("configuracoes")}
            >
              <Icon.Cog6ToothIcon className="w-5 h-5" />
              Configurações
            </button>
          </div>
          <div className="w-[95%] mt-9">
            {display === "home" && (
              <TransitionEffect isShowing={isShowing}>
                <HomeSection />
              </TransitionEffect>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
