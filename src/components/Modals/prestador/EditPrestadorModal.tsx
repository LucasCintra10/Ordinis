import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";
import { Modal } from "@/models/modal";
import * as Icon from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import api from "@/tools/api";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Prestador } from "@/models/prestador";
import { ColorRing } from "react-loader-spinner";

const EditPrestadorModal: React.FC<Modal> = ({ isOpen, setIsOpen }) => {
  const [prestador, setPrestador] = React.useState({} as Prestador);
  const [prestadores, setPrestadores] = React.useState([] as Prestador[]);

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
        console.log(response.data.data);
      })
      .catch((error) => {
        toast.error("Erro ao buscar prestadores");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrestador({ ...prestador, [event.target.name]: event.target.value });
  };

  function closeModal() {
    setPrestador({} as Prestador);
    setIsOpen(false);
  }

  React.useEffect(() => {
    getPrestadores();
  }, []);
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
                  <Dialog.Title className="text-xl font-bold text-c5">Editar Prestadores</Dialog.Title>
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
                      <div className="w-96 max-h-96 flex flex-col gap-4 overflow-auto">
                        {prestadores?.map((prestador, index) => {
                          return (
                            <div className="flex justify-between items-center gap-2" key={index}>
                              <div className="w-full bg-c1 rounded-xl px-2 py-1">
                                <h2 className="font-bold">{`${prestador?.nome} ${prestador?.sobrenome}`}</h2>
                              </div>
                            </div>
                          );
                        })}
                      </div>
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
