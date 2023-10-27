"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/tools/api";
import React from "react";
import { User } from "@/models/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({} as User);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    api
      .post("/login", user)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        router.push("/home");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Image src="/vectorTR.svg" alt="Ilustração" width={300} height={300} className="absolute top-0 right-0" />
      <Image src="/vectorBL.svg" alt="Ilustração" width={300} height={300} className="absolute bottom-0 left-0" />
      <div className="w-500 h-500 bg-c4 rounded-2xl flex flex-col  items-center  ">
        <div className="flex flex-col justify-center items-center my-8 ">
          <Image src="/logo.svg" alt="Logo" width={100} height={95} />
          <Image src="/ordinis.svg" alt="Ordinis" width={167} height={27} />
        </div>
        <form className="w-96 flex flex-col items-center gap-6" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            className="w-full h-12 rounded p-2 box-border outline-none transition-transform"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full h-12 rounded p-2 box-border outline-none transition-transform"
            onChange={(e) => setUser({ ...user, senha: e.target.value })}
          />
          {loading ? (
            <ColorRing colors={["#1E35C6", "#3146D0", "#4F63D7", "#677BEC", "#37407A"]} height={80} width={80} />
          ) : (
            <button type="submit" className="w-44 h-12 rounded bg-p3 text-white font-bold text-xl">
              Entrar
            </button>
          )}
          <Link href="/forgot" className="text-c3">
            Esqueceu a senha?
          </Link>
        </form>
      </div>
    </main>
  );
}
