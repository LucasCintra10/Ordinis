"use client";
import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
interface NavBarItemProps {
  icon: React.ElementType;
  text: string;
  address: string;
  onClick?: () => void;
}

const NavBarItem: React.FC<NavBarItemProps> = ({ icon: IconComponent, text, address, onClick }) => {

  const pathName = usePathname();

  return (
    <Link
      href={address}
      className={`w-44 h-12 flex items-center rounded  text-c2 font-bold text-base ml-2 gap-2 transition-colors hover:bg-c1 hover:text-p3 pl-2 ${pathName === address && "bg-c1 text-p3"} `}
      onClick={onClick}
    >
      <IconComponent className="w-5 h-5" />
      {text}
    </Link>
  );
};

export default function Navbar() {
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      toast.warning("Você precisa estar logado para acessar");
    }
  }, []);

  return (
    <>
      <div className="w-60 h-screen bg-c4 flex flex-col items-center rounded-r-10xl shrink-0">
        <div className="w-full flex flex-col justify-center items-center my-8 pl-2">
          <Image src="/logo.svg" alt="Logo" width={100} height={95} />
          <Image src="ordinis.svg" alt="Ordinis" width={167} height={27} />
        </div>
        <ul className=" w-full flex flex-col justify-center items-center gap-6 pt-4">
          <NavBarItem icon={Icon.HomeIcon} text="Home" address="/home" />
          <NavBarItem icon={Icon.ArchiveBoxIcon} text="Patrimônio" address="/patrimonios" />
          <NavBarItem icon={Icon.WrenchScrewdriverIcon} text="Manutenção" address="/manutencao" />
          <NavBarItem icon={Icon.DocumentTextIcon} text="Relatórios" address="/relatorios" />
          <NavBarItem icon={Icon.Cog6ToothIcon} text="Configurações" address="/configs" />
          <NavBarItem icon={Icon.QuestionMarkCircleIcon} text="Ajuda" address="/help" />
          <NavBarItem
            icon={Icon.ArrowLeftOnRectangleIcon}
            text="Sair"
            address="/"
            onClick={() => localStorage.removeItem("token")}
          />
        </ul>
      </div>
    </>
  );
}
