"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import getLocations from "@/providers/getLocations";
import { Location } from "@/models/location";
import Select from "@/components/Select";
import * as Icon from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import exportToExcel from "@/tools/exportExcel";
import api from "@/tools/api";
import { Property } from "@/models/property";
import Input from "@/components/Input";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import InfoPropertyModal from "@/components/Modals/patrimonio/InfoProperty";
import { Transition } from "@headlessui/react";
import { Maintenance } from "@/models/maintenance";
import moment from "moment";
import { ColorRing } from "react-loader-spinner";
import { get } from "http";

export default function HomePage() {
  const [locations, setLocations] = React.useState<Location[]>([]);

  const [isShowing, setIsShowing] = React.useState(true);

  const ReportsProperty: React.FC = () => {
    const [properties, setProperties] = React.useState<Property[]>([]);

    const [selected, setSelected] = React.useState({} as Location);

    const getPatrimonios = async () => {
      api
        .get(`/patrimonio/search`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            localizacao: selected.id,
          },
        })
        .then((res) => {
          setProperties(res.data.data);
        });
    };

    React.useEffect(() => {
      if (selected.id) {
        getPatrimonios();
      }
    }, [selected]);

    return (
      <>
        <Icon.ChevronDoubleDownIcon className="w-5 h-5" />
        <p>Relátorio dos Patrimônios</p>
        <div className="w-[100%] h-10 items-center justify-center">
          <Select
            selected={selected?.descricao}
            setSelected={(e) => {
              setSelected(e);
            }}
            options={locations}
            placeholder="Localização"
          />
        </div>

        <div className="w-[100%]">
          <Button
            onClick={() => {
              exportToExcel(properties);
            }}
            label="Exportar"
            type="button"
            disabled={!selected.id}
          />
        </div>
      </>
    );
  };

  const InfoProperty: React.FC = () => {
    const [search, setSearch] = React.useState("");
    const [property, setProperty] = React.useState({} as Property);

    const [infoPropertyModal, setInfoPropertyModal] = React.useState(false);

    const getPatrimonio = async () => {
      api
        .get(`/patrimonio/get-placa/${search}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response: any) => {
          setProperty(response.data.data);
          setInfoPropertyModal(true);
        })
        .catch((error: any) => {
          toast.error("Erro ao buscar patrimônio");
        });
    };

    return (
      <>
        <InfoPropertyModal isOpen={infoPropertyModal} setIsOpen={setInfoPropertyModal} data={property} />
        <Icon.ChevronDoubleDownIcon className="w-5 h-5" />
        <p>Informações do Patrimônio</p>
        <div className="w-[100%] h-10 items-center justify-center">
          <Input
            name="placaInfo"
            type="text"
            placeholder="Placa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-[100%]">
          <Button
            onClick={() => {
              getPatrimonio();
            }}
            label="Visualizar"
            type="button"
            disabled={!search}
          />
        </div>
      </>
    );
  };

  const AlterLocation: React.FC = () => {
    const [search, setSearch] = React.useState("");
    const [loading, setLoading] = React.useState({
      search: false,
      update: false,
    });
    const [property, setProperty] = React.useState({} as Property);
    const [selected, setSelected] = React.useState({} as Location);

    const getPatrimonio = async () => {
      setLoading({ ...loading, search: true });
      api
        .get(`/patrimonio/get-placa/${search}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response: any) => {
          setProperty(response.data.data);
        })
        .catch((error: any) => {
          toast.error("Erro ao buscar patrimônio");
        })
        .finally(() => {
          setLoading({ ...loading, search: false });
        });
    };

    const updateLocation = async () => {
      setLoading({ ...loading, update: true });
      api
        .patch(
          `/patrimonio/update-loc/${property.id}`,
          {
            id_localizacao: selected.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response: any) => {
          toast.success("Localização alterada com sucesso");
          setSearch("");
          setProperty({} as Property);
          setSelected({} as Location);
        })
        .catch((err: any) => {
          toast.error(err?.response?.data);
        })
        .finally(() => {
          setLoading({ ...loading, update: false });
        });
    };

    return (
      <>
        <Icon.ChevronDoubleDownIcon className="w-5 h-5" />
        <p>Mover Patrimônio</p>
        <div className="w-full h-10 flex justify-between items-center">
          <Input
            name="placaLoc"
            placeholder="Placa"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {loading.search ? (
            <div className="ml-4">
              <ThreeDots color={"#4F63D7"} height={55} width={55} />
            </div>
          ) : (
            <button
              type="submit"
              className="w-16 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 ml-4"
              onClick={() => {
                getPatrimonio();
              }}
            >
              <Icon.MagnifyingGlassIcon className="w-5 h-5 " />
            </button>
          )}
        </div>
        <div className={`w-full h-10 flex justify-between items-center ${!property.id && `opacity-70`}`}>
          <div className="w-[100%] h-10 items-center justify-center">
            <Select
              selected={selected?.descricao || property.localizacao?.descricao}
              setSelected={(e) => {
                setSelected(e);
              }}
              options={locations}
              placeholder="Localização"
              disabled={!property.id}
            />
          </div>
          {loading.update ? (
            <div className="ml-4">
              <ThreeDots color={"#4F63D7"} height={55} width={55} />
            </div>
          ) : (
            <button
              type="submit"
              className="w-16 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 ml-4"
              onClick={() => {
                updateLocation();
              }}
              disabled={!property || !selected.id}
            >
              <Icon.CheckIcon className="w-5 h-5 " />
            </button>
          )}
        </div>
      </>
    );
  };

  const ActiveMaintenances: React.FC = () => {
    const [maintenances, setMaintances] = React.useState<Maintenance[]>([]);
    const [loading, setLoading] = React.useState(false);

    const getActiveMaintances = async () => {
      setLoading(true);
      api
        .get(`/manutencao/get-ativas`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setMaintances(res?.data?.data);
        })
        .catch((err) => {
          toast.error(err?.response?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    React.useEffect(() => {
      getActiveMaintances();
    }, []);

    return (
      <>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ColorRing colors={["#1E35C6", "#3146D0", "#4F63D7", "#677BEC", "#37407A"]} height={80} width={80} />
          </div>
        ) : (
          <>
            <h2 className="w-full flex items-center gap-2 font-bold text-lg p-2">
              <Icon.PaperAirplaneIcon className="w-5 h-5" /> Manutenções Ativas
            </h2>
            <div className="w-full h-1 bg-c1 rounded-full my-2 " />
            <table className="w-full h-[70%] flex flex-col items-center rounded-xl overflow-auto scrollbar-thin ">
              <tbody className="w-full">
                {maintenances?.map((item: any, index: any) => (
                  <tr className={`w-full flex justify-between p-2 box-border`} key={index}>
                    <td className="w-2/6 truncate">{item?.patrimonio?.placa}</td>
                    <td className="w-2/6 truncate">
                      {item?.prestador?.nome} {item?.prestador?.sobrenome}
                    </td>
                    <td className="w-12 text-left">{moment.utc(item?.data_inicio).format("DD/MM")}</td>
                    <td className="w-12 text-left">{moment.utc(item?.data_prev_termino).format("DD/MM")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </>
    );
  };

  const PropertyList: React.FC = () => {
    const [properties, setProperties] = React.useState<Property[]>([]);

    const [loading, setLoading] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [pagedItems, setPagedItems] = React.useState<Property[]>([]);

    const items_per_page = 3;

    const getPatrimonios = async () => {
      setLoading(true);
      api
        .get(`/patrimonio/get-all-ruins`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setProperties(res.data.data);
        })
        .catch((err) => {
          toast.error(err?.response?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    React.useEffect(() => {
      getPatrimonios();
    }, []);

    React.useEffect(() => {
      setPagedItems(properties.slice(page * items_per_page, (page + 1) * items_per_page));
    }, [page, properties]);

    return (
      <>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ColorRing colors={["#1E35C6", "#3146D0", "#4F63D7", "#677BEC", "#37407A"]} height={80} width={80} />
          </div>
        ) : (
          <>
            <h2 className="w-full flex flex-col items-center gap-1 font-bold text-lg p-2">
              <Icon.ExclamationTriangleIcon className="w-6 h-6" />
              Patrimônios Danificados
            </h2>
            <table className="w-full">
              <tbody className="w-full flex flex-col items-center gap-2">
                {pagedItems?.map((item: any, index: any) => (
                  <tr className={`w-[95%] flex justify-between p-2 box-border bg-c1 rounded-full`} key={index}>
                    <td className="w-4/6 truncate">{item?.placa}</td>
                    <td className="w-2/6 text-left">{item?.localizacao?.descricao}</td>
                    <td className="w-2/6 text-left">{item?.origem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full flex gap-4 justify-center absolute bottom-2">
              <button
                className="w-5 h-5 bg-p3 rounded-full text-white flex items-center justify-center transition-all hover:opacity-90"
                onClick={() => {
                  setPage(page - 1);
                }}
                disabled={page == 0}
              >
                <Icon.ChevronLeftIcon className="w-3 h-3 " />
              </button>
              <button
                className="w-5 h-5 bg-p3 rounded-full text-white flex items-center justify-center transition-all hover:opacity-90  "
                onClick={() => {
                  setPage(page + 1);
                }}
                disabled={page == properties.length / items_per_page - 1}
              >
                <Icon.ChevronRightIcon className="w-3 h-3 " />
              </button>
            </div>
          </>
        )}
      </>
    );
  };

  React.useEffect(() => {
    getLocations().then((res) => {
      setLocations(res);
    });
  }, []);

  return (
    <>
      <main className="w-screen h-screen flex">
        <Image src="/vectorBR.svg" alt="Ilustração" width={400} height={400} className="absolute bottom-0 right-0" />
        <Navbar />
        <div className="w-full h-full flex flex-col ml-8">
          <div className="w-[50%] h-1/6 flex items-center">
            <h1 className="text-5xl font-bold text-c5 ">Home</h1>
          </div>
          <Transition
            appear={true}
            show={isShowing}
            enter={`transition-all ease-in-out duration-700`}
            enterFrom="opacity-0 translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="w-[95%] h-56 rounded-xl flex bg-white p-2">
              <div className="w-[60%] h-[100%] flex flex-col p-1 justify-around items-center">
                <ReportsProperty />
              </div>
              <div className="h-full w-1 bg-c1 rounded-full mx-8" />
              <div className="w-[60%] h-[100%] p-1 flex flex-col justify-around items-center">
                <InfoProperty />
              </div>
              <div className="h-full w-1 bg-c1 rounded-full mx-8" />
              <div className="w-full h-[100%] p-1 flex flex-col justify-around items-center">
                <AlterLocation />
              </div>
            </div>
            <div className="w-[95%] h-64 flex mt-8 justify-between">
              <div className="w-[50%] bg-white rounded-xl p-1">
                <ActiveMaintenances />
              </div>
              <div className="w-[40%] bg-white rounded-xl ml-8 relative">
                <PropertyList />
              </div>
            </div>
          </Transition>
        </div>
      </main>
    </>
  );
}
