"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="w-60 h-screen bg-c4 flex flex-col items-center rounded-r-10xl">
        <div className="w-full flex flex-col justify-center items-center my-12 ">
          <Image src="/logo.svg" alt="Logo" width={100} height={95} />
          <Image src="ordinis.svg" alt="Ordinis" width={167} height={27} />
        </div>
        <ul className=" w-full flex flex-col justify-center items-center gap-6">
          <Link href="/" className="w-44 h-12 flex items-center  text-c2 font-bold text-base">Home</Link>
          <Link href="/" className="w-44 h-12  flex items-center text-c2 font-bold text-base">Registros</Link>
          <Link href="/"className="w-44 h-12 flex items-center  text-c2 font-bold text-base">Relatórios</Link>
          <Link href="/"className="w-44 h-12 flex items-center  text-c2 font-bold text-base">Configurações</Link>
          <Link href="/"className="w-44 h-12 flex items-center  text-c2 font-bold text-base">Ajuda</Link>
          <Link href="/"className="w-44 h-12 flex items-center  text-c2 font-bold text-base">Sair</Link>
        </ul>
      </div>
    </>
  );
}
