import { Dialog, Transition } from "@headlessui/react";
import * as Icon from "@heroicons/react/24/outline";
import { Modal } from "@/models/modal";
import { toast } from "react-toastify";
import * as React from "react";
import api from "@/tools/api";
import { Category } from "@/models/category";
import WarningModal from "@/components/Modals/WarningModal";
import { ColorRing } from "react-loader-spinner";

const RemoveCategoryModal: React.FC<Modal> = ({ isOpen, setIsOpen }) => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  const [warningModal, setWarningModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [id, setId] = React.useState("");

  const getCategories = async () => {
    setLoading(true);
    api
      .get("/categoria/get-all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response: any) => {
        setCategories(response.data);
      })
      .catch((error: any) => {
        toast.error("Erro ao carregar as categorias!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const removeCategory = async () => {
    api
      .delete(`/categoria/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        toast.success("Categoria removida com sucesso!");
      })
      .catch(() => {
        toast.error("Erro ao remover a categoria!");
      })
      .finally(() => {
        getCategories();
      });
  };

  function closeModal() {
    setIsOpen(false);
  }

  React.useEffect(() => {
    if (isOpen) getCategories();
  }, [isOpen]);

  return (
    <>
      <WarningModal
        isOpen={warningModal}
        setIsOpen={setWarningModal}
        onConfirm={() => {
          removeCategory();
          setWarningModal(false);
        }}
        onCancel={() => {
          setWarningModal(false);
        }}
      />
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
                  <Dialog.Title className="text-xl font-bold text-c5">Remover Categorias</Dialog.Title>
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
                        {categories.map((category, index) => {
                          return (
                            <div className="flex justify-between items-center gap-2" key={index}>
                              <h2 className=" w-full text-lg bg-c1 rounded-xl px-2 py-1">{category.descricao}</h2>
                              <button className="bg-red-500 rounded-full p-1">
                                <Icon.XMarkIcon
                                  className="w-6 h-6 text-white"
                                  onClick={() => {
                                    setWarningModal(true);
                                    setId(category.id);
                                  }}
                                />
                              </button>
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

export default RemoveCategoryModal;
