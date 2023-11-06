"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import * as Icon from "@heroicons/react/24/outline";

export default function HelpPage() {
  const [display, setDisplay] = React.useState("home");

  interface AccordionProps {
    title: string;
    content: string;
  }

  const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
    return (
      <div className="my-3">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full h-12 flex justify-between items-center bg-p3 text-white font-bold text-xl rounded-lg px-4 py-2">
                <span >{title}</span>
                <Icon.ChevronDownIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 transition-all`} />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-c5 bg-white rounded-lg">
                  {content}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
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
          <div className="w-[95%] max-h-[60%] mt-12">
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
          </div>
        </div>
      </main>
    </>
  );
}
