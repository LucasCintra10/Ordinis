import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import * as Icon from "@heroicons/react/24/outline";

interface ISelectProps {
  selected: any;
  setSelected: (event: any) => void;
  options: any;
}

const Select: React.FC<ISelectProps> = ({ selected, setSelected, options }) => {
  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        <div className="h-full relative ">
          <Listbox.Button className="w-60 h-full bg-c1 rounded text-center relative">
            {selected}
            <Icon.ChevronDownIcon className="w-4 h-4 absolute right-1 top-3" />
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-60 py-1 overflow-auto bg-c1 rounded text-center">
              {options?.map((option: any) => (
                <Listbox.Option key={option.id} value={option} className="hover:cursor-pointer hover:bg-c2 py-1">
                  {option.descricao}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};

export default Select;
