import { Direction } from "@src/components/board/types";
import { atom } from "jotai";

interface ControlsState {
	handleMove: (direction: Direction) => () => void;
	handleReset: () => void;
}

export const controlsAtom = atom<ControlsState | null>(null);
