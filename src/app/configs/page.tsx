"use client";
import RemoveLocationModal from "@/components/Modals/localizacao/RemoveLocationModal";
import RemoveCategoryModal from "@/components/Modals/categoria/RemoveCategoryModal";
import RemoveUserModal from "@/components/Modals/user/RemoveUserModal";
import AddLocationModal from "@/components/Modals/localizacao/AddLocationModal";
import AddCategoryModal from "@/components/Modals/categoria/AddCategoryModal";
import AddUserModal from "@/components/Modals/user/AddUserModal";
import * as Icon from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import * as React from "react";

export default function ConfiguracoesPage() {
  const [isShowing, setIsShowing] = React.useState(true);
  const [addCategoryModal, setAddCategoryModal] = React.useState(false);
  const [addLocationModal, setAddLocationModal] = React.useState(false);
  const [addUserModal, setAddUserModal] = React.useState(false);
  const [removeCategoryModal, setRemoveCategoryModal] = React.useState(false);
  const [removeLocationModal, setRemoveLocationModal] = React.useState(false);
  const [removeUserModal, setRemoveUserModal] = React.useState(false);

  return (
    <>
      <AddCategoryModal isOpen={addCategoryModal} setIsOpen={setAddCategoryModal} />
      <AddLocationModal isOpen={addLocationModal} setIsOpen={setAddLocationModal} />
      <AddUserModal isOpen={addUserModal} setIsOpen={setAddUserModal} />
      <RemoveUserModal isOpen={removeUserModal} setIsOpen={setRemoveUserModal} />
      <RemoveCategoryModal isOpen={removeCategoryModal} setIsOpen={setRemoveCategoryModal} />
      <RemoveLocationModal isOpen={removeLocationModal} setIsOpen={setRemoveLocationModal} />
      <main className="w-screen h-screen flex relative">
        <Image src="/vectorBR.svg" alt="Ilustração" width={400} height={400} className="absolute bottom-0 right-0" />
        <Navbar />
        <div className="w-full h-full flex flex-col ml-8">
          <div className="w-[95%] h-1/6 flex items-center">
            <h1 className="text-5xl font-bold text-c5">Configurações</h1>
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
            <div className="w-[95%] h-96 flex justify-evenly text-c5 ">
              <div className="w-72 bg-white flex flex-col justify-evenly items-center rounded-xl hover:scale-105 transition-all">
                <h2 className="text-2xl font-semibold">Usuários</h2>
                <Icon.UserGroupIcon className="w-20 h-20 " />
                <div className="flex flex-col gap-2">
                  <div className="w-48">
                    <Button
                      label="Adicionar"
                      type="button"
                      onClick={() => {
                        setAddUserModal(true);
                      }}
                    />
                  </div>
                  <div className="w-48">
                    <Button label="Remover" type="button" onClick={() => {
                      setRemoveUserModal(true);
                    }} />
                  </div>
                </div>
              </div>

              <div className="w-72 bg-white flex flex-col justify-evenly items-center rounded-xl hover:scale-105 transition-all">
                <h2 className="text-2xl font-semibold">Categorias</h2>
                <Icon.RectangleStackIcon className="w-20 h-20 " />
                <div className="flex flex-col gap-2">
                  <div className="w-48">
                    <Button
                      label="Adicionar"
                      type="button"
                      onClick={() => {
                        setAddCategoryModal(true);
                      }}
                    />
                  </div>
                  <div className="w-48">
                    <Button
                      label="Remover"
                      type="button"
                      onClick={() => {
                        setRemoveCategoryModal(true);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="w-72 bg-white flex flex-col justify-evenly items-center rounded-xl hover:scale-105 transition-all">
                <h2 className="text-2xl font-semibold">Localizações</h2>
                <Icon.MapPinIcon className="w-20 h-20 " />
                <div className="flex flex-col gap-2">
                  <div className="w-48">
                    <Button
                      label="Adicionar"
                      type="button"
                      onClick={() => {
                        setAddLocationModal(true);
                      }}
                    />
                  </div>
                  <div className="w-48">
                    <Button
                      label="Remover"
                      type="button"
                      onClick={() => {
                        setRemoveLocationModal(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </main>
    </>
  );
}
