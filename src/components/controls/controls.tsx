import React, { FC } from "react";
import { Button } from "@src/components/controls/button";
import { downIcon, leftIcon, rightIcon, upIcon } from "@src/components/controls/icons";

export const Controls: FC = () => {
	return (
		<div className="flex w-full flex-col-reverse items-center justify-around md:flex-row">
			<div className="mt-14 flex w-full flex-col items-center justify-center space-y-14 md:mt-0 md:w-1/2">
				<p className="text-center">
					Popis ovládání hry Popis ovládání hry Popis ovládání hry Popis ovládání hry Popis ovládání hry Popis
					ovládání hry Popis ovládání hry
				</p>
				<button className="rounded-3xl bg-blue-600 py-4 px-8 text-lg text-white hover:bg-blue-700">
					Reset game
				</button>
			</div>
			<div className="grid grid-cols-3 grid-rows-3">
				<Button className="col-start-1 col-end-2 row-start-2 row-end-3" icon={leftIcon} />
				<Button className="col-start-2 col-end-3 row-start-1 row-end-2" icon={upIcon} />
				<Button className="col-start-3 col-end-4 row-start-2 row-end-3" icon={rightIcon} />
				<Button className="col-start-2 col-end-3 row-start-3 row-end-4" icon={downIcon} />
			</div>
		</div>
	);
};
