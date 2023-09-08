"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@heroicons/react/24/outline";

type NavBarItemProps = {
  icon: React.ElementType;
  text: string;
  address: string;
};

const NavBarItem = ({ icon: IconComponent, text, address }: NavBarItemProps) => {
  return (
    <Link
      href={address}
      className="w-44 h-12 flex items-center rounded  text-c2 font-bold text-base ml-2 gap-2 transition-colors hover:bg-c2 hover:text-p3"
    >
      <IconComponent className="w-5 h-5" />
      {text}
    </Link>
  );
};

export default function Navbar() {
  return (
    <>
      <div className="w-60 h-screen bg-c4 flex flex-col items-center rounded-r-10xl shrink-0">
        <div className="w-full flex flex-col justify-center items-center my-12 ">
          <Image src="/logo.svg" alt="Logo" width={100} height={95} />
          <Image src="ordinis.svg" alt="Ordinis" width={167} height={27} />
        </div>
        <ul className=" w-full flex flex-col justify-center items-center gap-6">
          <NavBarItem icon={Icon.HomeIcon} text="Home" address="/home" />
          <NavBarItem icon={Icon.ArchiveBoxIcon} text="Registros" address="/property" />
          <NavBarItem icon={Icon.DocumentTextIcon} text="Relatórios" address="/" />
          <NavBarItem icon={Icon.Cog6ToothIcon} text="Configurações" address="/" />
          <NavBarItem icon={Icon.QuestionMarkCircleIcon} text="Ajuda" address="/" />
          <NavBarItem icon={Icon.ArrowLeftOnRectangleIcon} text="Sair" address="/" />
        </ul>
      </div>
    </>
  );
}
