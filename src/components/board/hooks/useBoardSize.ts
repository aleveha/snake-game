import { Size } from "@src/components/board/types";
import { useEffect, useRef, useState } from "react";
import { calculateBoardWidth } from "@src/components/board/utils";

export const useBoardSize = () => {
	const parentRef = useRef<HTMLDivElement | null>(null);
	const [boardSize, setBoardSize] = useState<Size>();

	useEffect(() => {
		setBoardSize(prev => {
			if (parentRef?.current) {
				const { width } = parentRef.current.getBoundingClientRect();
				const newBoardWidth = calculateBoardWidth(width);
				return {
					height: window.innerWidth > window.innerHeight ? prev?.height ?? 600 : newBoardWidth,
					width: newBoardWidth,
				};
			}
			return undefined;
		});
	}, [parentRef]);

	return [boardSize, parentRef] as const;
};
