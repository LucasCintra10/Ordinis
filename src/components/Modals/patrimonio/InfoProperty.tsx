import * as Icon from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";
import { Property } from "@/models/property";
import moment from "moment";

interface InfoPropertyModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: Property;
}

const InfoPropertyModal: React.FC<InfoPropertyModalProps> = ({ isOpen, setIsOpen, data }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog onClose={closeModal} className="relative z-10">
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
        <form className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Title className="text-xl font-bold text-c5">Informações</Dialog.Title>
                <Icon.XMarkIcon className="w-6 h-6 absolute top-4 right-4 cursor-pointer" onClick={closeModal} />

                <Dialog.Description className="w-full">
                  <div className="w-full flex flex-col justify-center items-center gap-4">
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                      <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full flex flex-row  items-start gap-4">
                          <p className="w-28 text-sm font-bold text-c5">Placa</p>
                          <p className="text-sm font-normal text-c5">{data?.placa}</p>
                        </div>
                        <div className="w-full flex  items-start gap-4">
                          <p className="w-28 text-sm font-bold text-c5">Descrição</p>
                          <p className="text-sm font-normal text-c5">{data?.descricao}</p>
                        </div>
                        <div className="w-full flex items-start gap-4">
                          <p className="w-28 text-sm font-bold text-c5">Categoria</p>
                          <p className="text-sm font-normal text-c5">{data?.categoria?.descricao}</p>
                        </div>
                        <div className="w-full flex items-start gap-4">
                          <p className="w-28 text-sm font-bold text-c5">Localização</p>
                          <p className="text-sm font-normal text-c5">{data?.localizacao?.descricao}</p>
                        </div>
                        <div className="w-full flex items-start gap-4">
                          <p className="w-28 text-sm font-bold text-c5">Valor</p>
                          <p className="text-sm font-normal text-c5">{data?.valor}</p>
                        </div>
                        <div className="w-full flex items-start gap-4">
                          <p className="w-28 text-sm font-bold text-c5">Data Entrada</p>
                          <p className="text-sm font-normal text-c5">{moment(data?.data_entrada).format('DD/MM/YYYY')}</p>
                        </div>
                      </div>
                      <div className="w-full flex items-start gap-4">
                          <p className="w-28 text-sm font-bold text-c5">Conservação</p>
                          <p className="text-sm font-normal text-c5">{data?.estado}</p>
                        </div>
                    </div>
                  </div>
                </Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition>
  );
};

export default InfoPropertyModal;
