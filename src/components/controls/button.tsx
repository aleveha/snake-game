import clsx from "clsx";
import { FC, ReactNode } from "react";

interface Props {
	className?: string;
	icon: ReactNode;
}

export const Button: FC<Props> = ({ className, icon }) => (
	<button
		className={clsx(
			"flex w-fit items-center justify-center rounded-3xl bg-green-600 p-4 text-white hover:bg-green-700",
			className,
		)}
	>
		{icon}
	</button>
);
