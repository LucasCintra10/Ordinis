"use client";
import AddPrestadorModal from "@/components/Modals/prestador/AddPrestadorModal";
import RemoveUserModal from "@/components/Modals/user/RemoveUserModal";
import RemoveCategoryModal from "@/components/Modals/categoria/RemoveCategoryModal";
import RemoveLocationModal from "@/components/Modals/localizacao/RemoveLocationModal";
import AddLocationModal from "@/components/Modals/localizacao/AddLocationModal";
import AddCategoryModal from "@/components/Modals/categoria/AddCategoryModal";
import * as Icon from "@heroicons/react/24/outline";
import AddUserModal from "@/components/Modals/user/AddUserModal";
import { Transition } from "@headlessui/react";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import EditPrestadorModal from "@/components/Modals/prestador/EditPrestadorModal";
import * as React from "react";

export default function ConfiguracoesPage() {
  const [isShowing, setIsShowing] = React.useState(true);
  const [addUserModal, setAddUserModal] = React.useState(false);
  const [addCategoryModal, setAddCategoryModal] = React.useState(false);
  const [addLocationModal, setAddLocationModal] = React.useState(false);
  const [addPrestadorModal, setAddPrestadorModal] = React.useState(false);
  const [removeUserModal, setRemoveUserModal] = React.useState(false);
  const [removeCategoryModal, setRemoveCategoryModal] = React.useState(false);
  const [removeLocationModal, setRemoveLocationModal] = React.useState(false);
  const [editPrestadorModal, setEditPrestadorModal] = React.useState(false);

  const [display, setDisplay] = React.useState("add");

  return (
    <>
      <AddCategoryModal isOpen={addCategoryModal} setIsOpen={setAddCategoryModal} />
      <AddLocationModal isOpen={addLocationModal} setIsOpen={setAddLocationModal} />
      <AddUserModal isOpen={addUserModal} setIsOpen={setAddUserModal} />
      <AddPrestadorModal isOpen={addPrestadorModal} setIsOpen={setAddPrestadorModal} />
      <RemoveUserModal isOpen={removeUserModal} setIsOpen={setRemoveUserModal} />
      <RemoveCategoryModal isOpen={removeCategoryModal} setIsOpen={setRemoveCategoryModal} />
      <RemoveLocationModal isOpen={removeLocationModal} setIsOpen={setRemoveLocationModal} />
      <EditPrestadorModal isOpen={editPrestadorModal} setIsOpen={setEditPrestadorModal} />
      <main className="w-screen h-screen flex relative">
        <Image src="/vectorBR.svg" alt="Ilustração" width={400} height={400} className="absolute bottom-0 right-0" />
        <Navbar />
        <div className="w-full h-full flex flex-col ml-8">
          <div className="w-[95%] h-1/6 flex items-center">
            <h1 className="text-5xl font-bold text-c5">Configurações</h1>
          </div>
          <div className="w-[50%] flex gap-4">
          <button
            className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
              display === "add" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
            onClick={() => setDisplay("add")}
          >
            <Icon.Cog8ToothIcon className="w-5 h-5" />
            Configuração
          </button>
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
            <div className="w-[95%] h-80 flex text-c5 gap-8 mt-6 ">
              <div className="w-56 bg-white flex flex-col justify-evenly items-center rounded-xl hover:scale-105 transition-all">
                <h2 className="text-2xl font-semibold">Prestadores</h2>
                <Icon.WrenchIcon className="w-20 h-20 " />
                <div className="flex flex-col gap-2">
                  <div className="w-48">
                    <Button
                      label="Adicionar"
                      type="button"
                      onClick={() => {
                        setAddPrestadorModal(true);
                      }}
                    />
                  </div>
                  <div className="w-48">
                    <Button
                      label="Consultar"
                      type="button"
                      onClick={() => {
                        setEditPrestadorModal(true);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="w-56 bg-white flex flex-col justify-evenly items-center rounded-xl hover:scale-105 transition-all">
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
                    <Button
                      label="Remover"
                      type="button"
                      onClick={() => {
                        setRemoveUserModal(true);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="w-56 bg-white flex flex-col justify-evenly items-center rounded-xl hover:scale-105 transition-all">
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

              <div className="w-56 bg-white flex flex-col justify-evenly items-center rounded-xl hover:scale-105 transition-all">
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
