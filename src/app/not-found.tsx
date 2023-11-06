import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Image src="/vectorTR.svg" alt="Ilustração" width={300} height={300} className="absolute top-0 right-0" />
      <Image src="/vectorBL.svg" alt="Ilustração" width={300} height={300} className="absolute bottom-0 left-0" />
      <div className="w-[32%] h-[40%] bg-c4 rounded-2xl flex flex-col  items-center  ">
        <div className="flex flex-col justify-center items-center my-8 ">
          <Image src="/logo.svg" alt="Logo" width={100} height={95} />
        </div>
        <div className="w-full flex flex-col justify-around items-center gap-7">
          <h2 className="text-2xl font-bold text-white">Ops, página não encontrada !</h2>
          <Link href="/">
            <span className="text-white uppercase bg-p3 px-4 py-2 rounded font-bold">Voltar ao inicío</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
