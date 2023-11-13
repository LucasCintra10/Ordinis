import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";
import { Modal } from "@/models/modal";
import * as Icon from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import api from "@/tools/api";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { User } from "@/models/user";
import { ThreeDots } from "react-loader-spinner";

const AddUserModal: React.FC<Modal> = ({ isOpen, setIsOpen }) => {

  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [user, setUser] = React.useState({} as User);

  const addUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      user.nome === undefined ||
      user.sobrenome === undefined ||
      user.email === undefined ||
      user.cpf === undefined ||
      user.senha === undefined
      ) {
        toast.error("Preencha todos os campos!");
        return;
      }
      setLoading(true);
    api
      .post("/usuario/create", user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Usuário criado com sucesso!");
        closeModal();
      })
      .catch((err) => {
        toast.error(err?.response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  function closeModal() {
    setUser({} as User);
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
            addUser(e);
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
                <Dialog.Title className="text-xl font-bold text-c5">Adicionar Novo Usuário </Dialog.Title>
                <Icon.XMarkIcon className="w-6 h-6 absolute top-4 right-4 cursor-pointer" onClick={closeModal} />
                <Dialog.Description className="w-full flex flex-col gap-4">
                  <div className="w-full h-12 flex justify-evenly items-center">
                    <Input type="text" label="Nome" name="nome" onChange={handleInputChange} placeholder="Nome" />
                  </div>
                  <div className="w-full h-12 flex justify-evenly items-center">
                    <Input type="text" label="Sobrenome" name="sobrenome" onChange={handleInputChange} placeholder="Sobrenome" />
                  </div>
                  <div className="w-full h-12 flex justify-evenly items-center">
                    <Input type="email" label="Email" name="email" onChange={handleInputChange} placeholder="exemplo@email.com" />
                  </div>
                  <div className="w-full h-12 flex justify-evenly items-center">
                    <Input type="text" label="CPF" name="cpf" onChange={handleInputChange} placeholder="123456789-12" />
                  </div>
                  <div className="w-full h-12 flex justify-evenly items-center">
                    <Input
                      type={showPassword ? "text" : "password"}
                      label="Senha"
                      name="senha"
                      placeholder="********"
                      onChange={handleInputChange}
                    />
                    {showPassword ? (
                      <EyeSlashIcon
                        className="w-5 h-5 cursor-pointer absolute right-6"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    ) : (
                      <EyeIcon
                        className="w-5 h-5 cursor-pointer absolute right-6"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    )}
                  </div>
                  <span className="text-xs text-c2 ml-auto">(A senha deve conter no mínimo 6 caracteres) </span>
                  <div className="w-full h-12 flex items-center ">
                    <label className="w-52">Permissao</label>
                    <div className=" w-full h-full flex justify-around items-center border-2 border-c1 rounded ">
                      <div className="flex gap-2 cursor-pointer">
                        <input
                          type="radio"
                          id="adm"
                          name="permissao"
                          value="ADMINISTRADOR"
                          onChange={handleInputChange}
                        />
                        <label className="cursor-pointer" htmlFor="adm">
                          Administrador
                        </label>
                      </div>
                      <div className="flex gap-2 ">
                        <input
                          type="radio"
                          id="worker"
                          name="permissao"
                          value="FUNCIONARIO"
                          onChange={handleInputChange}
                        />
                        <label className="cursor-pointer" htmlFor="worker">
                          Funcionário
                        </label>
                      </div>
                    </div>
                  </div>
                </Dialog.Description>
                <Dialog.Description className="w-full">
                {loading ? (
                    <div className="flex justify-center">
                      <ThreeDots color="#1D539F" height={40} width={40} />
                    </div>
                  ) : (
                    <Button type="submit" label="Adicionar" />
                  )}
                </Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition>
  );
};

export default AddUserModal;
