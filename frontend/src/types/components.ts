import type { Character } from "./models";

export interface DropdownProps {
    position: { x: number; y: number };
    characters: Character[];
    onSelect: (character: Character) => void;
    onClose: () => void;
}

export interface RelativePosition {
    x: number;
    y: number;
}

export interface GameHeaderProps {
    status: string;
    characters: Character[];
}

export interface TimerProps {
    gameFinished: boolean;
    onFinish: (time: number) => void;
}

export interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}
