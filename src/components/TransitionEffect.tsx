import { Transition } from "@headlessui/react";

interface TransitionEffectProps {
  isShowing: boolean;
  children: React.ReactNode;
}

const TransitionEffect: React.FC<TransitionEffectProps> = ({ isShowing, children }) => {
  return (
    <Transition
      appear={true}
      show={isShowing}
      enter={`transition-all ease-in-out duration-700`}
      enterFrom="opacity-0 translate-y-6"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all ease-in-out duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="w-full"
    >
      {children}
    </Transition>
  );
};

export default TransitionEffect;
