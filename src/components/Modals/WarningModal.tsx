import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";
import { Modal } from "@/models/modal";
interface WarningModalProps extends Modal {
  onConfirm: () => void;
  onCancel: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ onConfirm, onCancel, isOpen, setIsOpen }) => {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" onClose={onCancel} className="relative z-10">
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
              <Dialog.Panel className="w-auto transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all flex flex-col justify-center items-center gap-6">
                <Dialog.Title className="text-xl font-bold text-c5">Atenção!</Dialog.Title>
                <Dialog.Description className="w-full">
                  <div className="w-64 h-10 flex justify-evenly items-center">
                    <p className="text-c5 text-center">Essa ação é irreversível, deseja mesmo continuar ?</p>
                  </div>
                </Dialog.Description>
                <Dialog.Description className="w-full flex gap-2">
                  <button
                    className="w-full bg-c1 text-c4 uppercase rounded py-1 transition-all hover:opacity-90"
                    onClick={onConfirm}
                  >
                    Continuar
                  </button>
                  <button
                    className="w-full bg-c2 text-white uppercase rounded py-1 transition-all hover:opacity-90"
                    onClick={onCancel}
                  >
                    Cancelar
                  </button>
                </Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default WarningModal;
