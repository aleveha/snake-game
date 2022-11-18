import React, { FC } from "react";

interface Props {
	children: React.ReactNode;
}

export const Badge: FC<Props> = ({ children }) => {
	return <span className="rounded-xl border bg-green-600 px-3 py-2 text-white">{children}</span>;
};
