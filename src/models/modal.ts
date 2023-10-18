export interface Modal {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    id?: string;
}