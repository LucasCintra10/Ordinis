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

const AddPrestadorModal: React.FC<Modal> = ({ isOpen, setIsOpen }) => {
  const [prestador, setPrestador] = React.useState({} as Prestador);

  const addPrestador = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    api
      .post("/prestador/create", {
        ...prestador,
        numero: Number(prestador.numero),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Cadastro criado com sucesso!");
        closeModal();
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrestador({ ...prestador, [event.target.name]: event.target.value });
  };

  function closeModal() {
    setPrestador({} as Prestador);
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog onClose={() => {}} className="relative z-10">
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
        <form
          className="fixed inset-0 overflow-y-auto"
          onSubmit={(e) => {
            addPrestador(e);
          }}
        >
          <div className="flex min-h-full items-center justify-center p-4">
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
                <Dialog.Title className="text-xl font-bold text-c5">Adicionar Prestador de Serviço</Dialog.Title>
                <Icon.XMarkIcon className="w-6 h-6 absolute top-4 right-4 cursor-pointer" onClick={closeModal} />
                <Dialog.Description className="w-full flex flex-col gap-4">
                  <div className="w-full h-12 flex justify-evenly items-center">
                    <Input type="text" label="Nome" name="nome" onChange={handleInputChange} />
                  </div>
                  <div className="w-full h-12 flex justify-evenly items-center">
                    <Input type="text" label="Sobrenome" name="sobrenome" onChange={handleInputChange} />
                  </div>
                  <div className="w-full h-12 flex justify-evenly items-center">
                    <Input type="text" label="Descrição" name="descricao" onChange={handleInputChange} />
                  </div>
                  <div className="w-full h-12 flex justify-evenly items-center">
                    <Input type="text" label="Telefone" name="telefone" onChange={handleInputChange} />
                  </div>
                  <div className="w-full h-12 flex justify-evenly items-center">
                    <Input type="text" label="Rua" name="rua" onChange={handleInputChange} />
                  </div>
                  <div className="w-full h-12 flex justify-evenly items-center">
                    <Input type="text" label="Número" name="numero" onChange={handleInputChange} />
                  </div>
                  <div className="w-full h-12 flex justify-evenly items-center">
                    <Input type="text" label="Bairro" name="bairro" onChange={handleInputChange} />
                  </div>
                </Dialog.Description>
                <Dialog.Description className="w-full">
                  <Button type="submit" label="Adicionar" />
                </Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition>
  );
};

export default AddPrestadorModal;
