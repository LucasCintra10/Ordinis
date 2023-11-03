"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import * as Icon from "@heroicons/react/24/outline";

export default function HelpPage() {
  return (
    <>
      <main className="w-screen h-screen flex justify-center items-center">
        <Image src="/vectorBR.svg" alt="Ilustração" width={400} height={400} className="absolute bottom-0 right-0" />
        <Navbar />
        <div className="w-full h-full flex flex-col ml-8">
          <div className="w-[50%] h-1/6 flex items-center">
            <h1 className="text-5xl font-bold text-c5 ">Ajuda</h1>
          </div>
          <div className="w-[75%] gap-4">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="w-full flex justify-between items-center bg-p3 text-white font-bold text-xl rounded-lg px-4 py-2 ">
                    <span>Home</span>
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
                      <h3>Ferramentas Disponiveis:</h3>
                      <p>1. Relátorio dos Patrimônios</p>
                      <p>2. Informações do Patrimônio</p>
                      <p>3. Mover Patrimônio</p>

                      <h3>Como usar o Relátorio dos Patrimônios:</h3>
                      <p>1. Escolha o local desejado no campo de seleção.</p>
                      <p>2. Clique no botão Exportar.</p>
                      <p>
                        3. Um arquivo em formato de planilha será baixado. Este arquivo contem um relatório completo dos
                        patrimônios presentes no local selecionado.
                      </p>
                      <h3>Como usar as Informações do Patrimônio:</h3>
                      <p>1. Informe a placa do patrimônio.</p>
                      <p>2. Clique no botão Buscar.</p>
                      <p>
                        3. Uma janela será aberta com as informações do patrimônio. Caso o patrimônio esteja baixado as
                        informações referentes a baixa serão exibidas.
                      </p>
                        <h3>Como usar o Mover Patrimônio:</h3>
                        <p>1. Informe a placa do patrimônio.</p>
                        <p>2. Clique no botão com o icone da lupa .</p>
                        <p>3. A caixa de seleção será desbloqueada com a localização atual do patrimônio</p>
                        <p>4. Selecione o novo local desejado.</p>
                        <p>5. Clique no botão com o icone de check para concluir o processo.</p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </main>
    </>
  );
}
