import clsx from "clsx";
import { FC } from "react";
import { ICONS } from "@src/components/controls/icons";
import { Direction } from "@src/components/board/types";

interface Props {
	className?: string;
	direction: Direction;
	onClick?: () => void;
}

export const Button: FC<Props> = ({ className, direction, onClick }) => (
	<button
		className={clsx(
			"flex w-fit items-center justify-center rounded-3xl bg-green-600 p-4 text-white hover:bg-green-700",
			className,
		)}
		onClick={onClick}
	>
		{ICONS[direction]}
	</button>
);
