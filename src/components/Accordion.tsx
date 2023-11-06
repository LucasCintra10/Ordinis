import { Disclosure, Transition } from "@headlessui/react";
import * as Icon from "@heroicons/react/24/outline";

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const handleDisclosureButtonClick = (event: any) => {
    const disclosureButtons = document.getElementsByClassName("disclosure-button");
    for (let i = 0; i < disclosureButtons.length; i++) {
      const disclosureButton = disclosureButtons.item(i) as HTMLElement;
      if (disclosureButton !== event.target && disclosureButton?.getAttribute("data-headlessui-state") === "open") {
        disclosureButton?.click();
      }
    }
  };

  return (
    <div className="transition-all">
      <Disclosure >
        {({ open }) => (
          <>
            <Disclosure.Button
              className="disclosure-button w-full h-12 flex justify-between items-center bg-p3 text-white font-bold text-xl rounded-lg px-4 py-2 "
              onClick={handleDisclosureButtonClick}
            >
              <span>{title}</span>
              <Icon.ChevronDownIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 transition-all`} />
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-c5 bg-white rounded-lg">
                {content}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Accordion;
