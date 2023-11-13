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
          content="Como Usar o Relátorio dos Patrimônios:
            <p> 1. Selecione a sala desejada no campo de seleção. </p>
            <p> 2. Clique no botão exportar. </p>
            <p>
            •	Resultado:
              Um arquivo em formato Excel será criado na sua pasta de downloads. Este arquivo conterá um relatório completo dos patrimônios presentes na localização selecionada.
            </p>
          "
        />
        <Accordion
          title="Informações do Patrimônio"
          content="Como usar as Informações do Patrimônio:
            <p>1. Informe a placa do patrimônio.</p>
            <p>2. Clique no botão Buscar.</p>
            <p>
            •	Resultado: Uma janela será aberta com as informações do patrimônio. Caso o patrimônio esteja baixado as
              informações referentes a baixa serão exibidas.
            </p>
          "
        />
        <Accordion
          title="Mover Patrimônio"
          content="Como usar o Mover Patrimônio:
            <p>1. Informe a placa do patrimônio.</p>
            <p>2. Clique no botão com o icone da lupa .</p>
            <p>3. A caixa de seleção será desbloqueada com a localização atual do patrimônio</p>
            <p>4. Selecione o novo local desejado.</p>
            <p>5. Clique no botão com o icone de check para concluir o processo.</p>
          "
        />
        <Accordion
          title="Manutenções Pendentes"
          content="•	Como Usar a Tabela de Manutenções Pendentes:
            <p>1.	A tabela mostra a placa de identificação do patrimônio, a descrição da manutenção, o prestador de serviço responsável e a data prevista para o término da manutenção.</p>
            <p>2.	Periodicamente, verifique esta tabela para acompanhar as manutenções pendentes e suas datas previstas de conclusão.</p>
            <p>3.	Quando uma manutenção for finalizada, ela será removida automaticamente desta tabela informativa.</p>
          "
        />
        <Accordion
          title="Patrimônios Danificados"
          content="•	Como Usar a Tabela de Patrimônios Danificados:
          <p>1.	A tabela mostra a placa de identificação do patrimônio, a descrição do patrimônio e o seu estado de conservação.</p>
          <p>2.	Utilize essa tabela para ter uma gestão eficiente dos recursos, ajudando a priorizar as ações de manutenção e garantir que os patrimônios estejam em boas condições de funcionamento</p>
          "
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
