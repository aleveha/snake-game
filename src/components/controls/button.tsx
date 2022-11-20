import clsx from "clsx";
import { FC } from "react";
import { Icon, ICONS } from "@src/components/controls/icons";
import { Direction } from "@src/components/board/types";

interface Props {
	className?: string;
	icon: Icon | Direction;
	onClick?: () => void;
}

export const Button: FC<Props> = ({ className, icon, onClick }) => (
	<button
		className={clsx(
			"flex w-fit items-center justify-center rounded-2xl bg-green-600 p-3 text-white hover:bg-green-700",
			className,
		)}
		onClick={onClick}
	>
		{ICONS[icon]}
	</button>
);
