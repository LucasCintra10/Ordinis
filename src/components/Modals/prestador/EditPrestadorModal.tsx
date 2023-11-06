import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";
import { Modal } from "@/models/modal";
import * as Icon from "@heroicons/react/24/outline";
import api from "@/tools/api";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Prestador } from "@/models/prestador";
import { ColorRing } from "react-loader-spinner";

const EditPrestadorModal: React.FC<Modal> = ({ isOpen, setIsOpen }) => {
  const [prestador, setPrestador] = React.useState({} as Prestador);
  const [prestadores, setPrestadores] = React.useState([] as Prestador[]);

  const [display, setDisplay] = React.useState("view");

  const [loading, setLoading] = React.useState(true);

  const getPrestadores = async () => {
    setLoading(true);
    api
      .get("/prestador/get-all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPrestadores(response.data.data);
      })
      .catch((error) => {
        toast.error("Erro ao buscar prestadores");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getPrestador = async (id: string) => {
    setLoading(true);
    api
      .get(`/prestador/get/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPrestador(response.data.data);
      })
      .catch((error) => {
        toast.error("Erro ao buscar prestador");
      })
      .finally(() => {
        setDisplay("edit");
        setLoading(false);
      });
  };

  const updatePrestador = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    api
      .put(`/prestador/update/${prestador?.id}`, {
        ...prestador,
        numero: Number(prestador?.numero)
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        toast.success("Prestador atualizado com sucesso");
        getPrestadores();
        setDisplay("view");
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const cellphoneMask = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrestador({ ...prestador, [event.target.name]: event.target.value });
  };

  function closeModal() {
    setPrestador({} as Prestador);
    setIsOpen(false);
  }

  React.useEffect(() => {
    if (isOpen) {
      setDisplay("view");
      getPrestadores();
    }
  }, [isOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" onClose={() => {}} static className="relative z-10">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-auto transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all flex flex-col justify-center gap-6">
                  <Dialog.Title className="text-xl font-bold text-c5">
                    {display === "view" && "Prestadores de serviço"}
                    {display === "edit" && <Icon.ArrowSmallLeftIcon className="w-6 h-6 cursor-pointer" onClick={() => setDisplay("view")} />}
                    </Dialog.Title>
                  <Icon.XMarkIcon className="w-6 h-6 absolute top-4 right-5 cursor-pointer" onClick={closeModal} />
                  <Dialog.Description className="w-full">
                    {loading ? (
                      <div className="w-96 h-[50%] flex justify-center items-center">
                        <ColorRing
                          colors={["#1E35C6", "#3146D0", "#4F63D7", "#677BEC", "#37407A"]}
                          height={80}
                          width={80}
                        />
                      </div>
                    ) : (
                      <>
                        {display === "view" && (
                          <div className="w-96 max-h-96 flex flex-col gap-4 overflow-auto scrollbar-thin pr-2">
                            {prestadores?.map((prestador, index) => {
                              return (
                                <div className="flex justify-between items-center gap-2" key={index}>
                                  <div className="w-full bg-c1 rounded-xl px-2 py-1 relative">
                                    <h2 className="font-bold">{`${prestador?.nome} ${prestador?.sobrenome}`}</h2>
                                    <p>{prestador?.descricao}</p>
                                    <p>{cellphoneMask(prestador?.telefone)}</p>
                                    <p>{`${prestador?.rua} ${prestador?.numero}, ${prestador.bairro} `}</p>
                                    <Icon.PencilIcon
                                      className="w-5 h-5 absolute top-2 right-2 cursor-pointer"
                                      onClick={() => {getPrestador(prestador?.id)}}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {display === "edit" && (
                          <form className="w-full flex flex-col gap-4" onSubmit={(e) => {updatePrestador(e)}}>
                            <div className="w-full h-12 flex justify-evenly items-center">
                              <Input type="text" label="Nome" name="nome" value={prestador?.nome} onChange={handleInputChange} />
                            </div>
                            <div className="w-full h-12 flex justify-evenly items-center">
                              <Input type="text" label="Sobrenome" name="sobrenome" value={prestador?.sobrenome} onChange={handleInputChange} />
                            </div>
                            <div className="w-full h-12 flex justify-evenly items-center">
                              <Input type="text" label="Descrição" name="descricao" value={prestador?.descricao} onChange={handleInputChange} />
                            </div>
                            <div className="w-full h-12 flex justify-evenly items-center">
                              <Input type="text" label="Telefone" name="telefone" value={prestador?.telefone} onChange={handleInputChange} />
                            </div>
                            <div className="w-full h-12 flex justify-evenly items-center">
                              <Input type="text" label="Rua" name="rua" value={prestador?.rua} onChange={handleInputChange} />
                            </div>
                            <div className="w-full h-12 flex justify-evenly items-center">
                              <Input type="text" label="Número" name="numero" value={prestador?.numero} onChange={handleInputChange} />
                            </div>
                            <div className="w-full h-12 flex justify-evenly items-center">
                              <Input type="text" label="Bairro" name="bairro" value={prestador?.bairro} onChange={handleInputChange} />
                            </div>
                            <Button label="Salvar" type="submit" />
                          </form>
                        )}
                      </>
                    )}
                  </Dialog.Description>
                  <Dialog.Description className="w-full"></Dialog.Description>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditPrestadorModal;
