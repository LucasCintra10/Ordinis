import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function HelpPage() {
  return (
    <>
      <main className="w-screen h-screen flex justify-center items-center">
        <Image src="/vectorBR.svg" alt="Ilustração" width={400} height={400} className="absolute bottom-0 right-0" />
        <Navbar />
        <div className="w-full h-full flex flex-col ml-8"></div>
      </main>
    </>
  );
}
