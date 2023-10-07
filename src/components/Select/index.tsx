import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import * as Icon from "@heroicons/react/24/outline";

interface SelectProps {
  selected: any;
  setSelected: (event: any) => void;
  options: any;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({ selected, setSelected, options, disabled }) => {
  return (
    <>
      <Listbox value={selected} onChange={setSelected} disabled={disabled}>
        <div className="w-full h-full relative ">
          <Listbox.Button className="w-full h-full bg-c1 rounded text-center relative">
            {selected}
            <Icon.ChevronDownIcon className="w-4 h-4 absolute right-1 top-3" />
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="w-full max-h-32 absolute z-10 py-1 overflow-auto bg-c1 rounded text-center mt-2">
              {options?.map((option: any) => (
                <Listbox.Option key={option.id} value={option} className="hover:cursor-pointer hover:text-p2 py-1">
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
