import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";
import { Modal } from "@/models/modal";
import * as Icon from "@heroicons/react/24/outline";
import api from "@/tools/api";
import { toast} from "react-toastify";

const AddCategoryModal: React.FC<Modal> = ({ isOpen, setIsOpen }) => {

  const [category, setCategory] = React.useState("");

  const addCategory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .post("/categoria/create", {descricao: category}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        toast.success("Categoria adicionada com sucesso!")
      })
      .catch(() => {
        toast.error("Erro ao adicionar categoria!");
      });
  }

  const  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  }
        
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
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
        <form className="fixed inset-0 overflow-y-auto" onSubmit={(e) => addCategory(e)}>
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center justify-center gap-6">
                <Dialog.Title className="text-2xl font-bold text-c5">Adicionar nova categoria</Dialog.Title>
                <Icon.XMarkIcon className="w-6 h-6 absolute top-4 right-4 cursor-pointer" onClick={closeModal} />
                <Dialog.Description className="w-full">
                  <div className="w-full h-12 flex justify-evenly items-center gap-4">
                    <span className=" text-c5 font-medium ">Categoria</span>
                    <input type="text" className="w-full h-full bg-c1 rounded" onChange={(e) => handleInputChange(e)} />
                  </div>
                </Dialog.Description>
                <Dialog.Description className="w-full">
                  <button type="submit" className="w-full h-12 bg-p3 text-white text-xl rounded flex justify-center items-center gap-2  transition-all hover:opacity-90">
                    Adicionar
                  </button>
                </Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition>
  );
};

export default AddCategoryModal;
