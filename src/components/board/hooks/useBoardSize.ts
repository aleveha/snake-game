import { Size } from "@src/components/board/types";
import { useEffect, useRef, useState } from "react";
import { calculateWidth } from "@src/components/board/utils";

export const useBoardSize = () => {
	const parentRef = useRef<HTMLDivElement | null>(null);
	const [size, setSize] = useState<Size>({ height: 600, width: 1000 });

	useEffect(() => {
		if (parentRef?.current) {
			const { height, width } = parentRef.current.getBoundingClientRect();
			const newWidth = calculateWidth(width);
			setSize(prev => ({
				height: width > height ? prev.height : newWidth,
				width: newWidth,
			}));
		}
	}, [parentRef]);

	return [size, parentRef] as const;
};
