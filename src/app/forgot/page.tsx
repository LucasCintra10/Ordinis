import Image from "next/image";
import Link from "next/link";

export default function ForgotPage() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Image src="/vector9.svg" alt="Ilustração" width={300} height={300} className="absolute top-0 right-0" />
      <Image src="/vector10.svg" alt="Ilustração" width={300} height={300} className="absolute bottom-0 left-0" />

      <div className="w-500 h-500 bg-c4 rounded-xl flex flex-col  items-center  ">
        <div className="flex flex-col justify-center items-center my-12 ">
          <Image src="/logo.svg" alt="Logo" width={100} height={95} />
          <Image src="ordinis.svg" alt="Ordinis" width={167} height={27} />
        </div>
        <form className="w-96 flex flex-col items-center gap-6">
            <h2 className="text-c2">Informe o email da conta</h2>
          <input type="email" placeholder="E-mail" className="w-full h-12 rounded-xl p-2 box-border" />
          <button className="w-full h-12 rounded-xl bg-btn-pattern-big bg-no-repeat bg-cover text-white font-bold text-xl">Enviar link de recuperação</button>
        </form>

      </div>
    </main>
  );
}
