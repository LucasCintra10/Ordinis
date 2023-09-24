"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import * as React from "react";
import { Property } from "@/models/property";
import api from "@/tools/api";
import { ColorRing } from "react-loader-spinner";

export default function ReportsPage() {
  const [property, setProperty] = React.useState<Property[]>([]);
  const [loading, setLoading] = React.useState(false);

  const getAllProperties = async () => {
    setLoading(true);
    api
      .get("/patrimonio/get-all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProperty(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const moneyFormat = (value: number) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };
  const dateFormat = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString("pt-BR");
  };

  React.useEffect(() => {
    getAllProperties();
  }, []);

  return (
    <main className="w-screen h-screen flex">
      <Image src="/vectorBR.svg" alt="Ilustração" width={700} height={700} className="absolute bottom-0 right-0" />
      <Navbar />
      <div className="w-full h-full flex flex-col ml-8 box-border items-center">
        <div className="w-[90%] h-1/6 flex items-center">
          <h1 className="text-5xl font-bold text-c5 ">Relatórios</h1>
        </div>
        <div className="w-[90%] max-h-[80%] flex flex-col items-center bg-white z-10 rounded-xl p-2">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <ColorRing colors={["#1E35C6", "#3146D0", "#4F63D7", "#677BEC", "#37407A"]} height={80} width={80} />
            </div>
          ) : (
            <table className="w-full h-auto flex flex-col items-center border-solid border-2 border-c4 rounded-xl overflow-auto">
              <thead className="w-full h-1/6 flex justify-between items-center">
                <tr className="w-full h-auto flex justify-between items-center bg-c1 p-4 ">
                  <th className="w-1/6 h-full flex  items-center">Placa</th>
                  <th className="w-1/6 h-full flex  items-center">Categoria</th>
                  <th className="w-1/6 h-full flex  items-center">Localização</th>
                  <th className="w-1/6 h-full flex  items-center">Valor</th>
                  <th className="w-1/6 h-full flex  items-center">Origem</th>
                  <th className="w-1/6 h-full flex  items-center">Estado</th>
                  <th className="w-1/6 h-full flex  items-center">Data de Ent.</th>
                </tr>
              </thead>
              <tbody className="w-full h-5/6 flex flex-col  items-center">
                {property?.map((item: any, index: any) => (
                  <tr className={`w-full flex items-center p-4 ${index % 2 == 0 ? `` : `bg-c1`}`} key={index}>
                    <td className="w-1/6 h-full flex items-center">{item?.placa}</td>
                    <td className="w-1/6 h-full flex items-center">{item?.categoria.descricao}</td>
                    <td className="w-1/6 h-full flex items-center">{item?.localizacao.descricao}</td>
                    <td className="w-1/6 h-full flex items-center">{moneyFormat(item?.valor)}</td>
                    <td className="w-1/6 h-full flex items-center">{item?.origem}</td>
                    <td className="w-1/6 h-full flex items-center">{item?.estado}</td>
                    <td className="w-1/6 h-full flex items-center">{dateFormat(item?.data_entrada)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
