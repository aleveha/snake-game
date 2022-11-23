import React, { FC } from "react";
import { Button } from "@src/components/controls/button";
import { useAtom } from "jotai";
import { controlsAtom } from "@src/states/controls-atom";

export const Controls: FC = () => {
	const [controlsState] = useAtom(controlsAtom);

	if (!controlsState) {
		return null;
	}

	const { handleMove, handleReset } = controlsState;

	return (
		<div className="flex w-full flex-col justify-between space-y-8 md:flex-row-reverse md:space-y-0">
			<div className="flex justify-center">
				<div className="grid w-fit grid-cols-3 grid-rows-2 grid-rows-3 gap-2">
					<Button
						className="col-start-1 col-end-2 row-start-2 row-end-3"
						icon="left"
						onClick={handleMove("left")}
					/>
					<Button
						className="col-start-2 col-end-3 row-start-2 row-end-3 bg-blue-600 hover:bg-blue-700"
						icon="reset"
						onClick={handleReset}
					/>
					<Button
						className="col-start-3 col-end-4 row-start-2 row-end-3"
						icon="right"
						onClick={handleMove("right")}
					/>
					<Button
						className="col-start-2 col-end-3 row-end-3 row-end-4"
						icon="down"
						onClick={handleMove("down")}
					/>
					<Button
						className="col-start-2 col-end-3 row-start-1 row-end-2"
						icon="up"
						onClick={handleMove("up")}
					/>
				</div>
			</div>
			<div className="space-y-5">
				<p>W nebo ⬆️ &ndash; posunout se nahoru</p>
				<p>️S nebo ⬇️ &ndash; posunout se dolu</p>
				<p>A nebo ⬅️ &ndash; posunout se vlevo</p>
				<p>D nebo ➡️ &ndash; posunout se vpravo</p>
			</div>
		</div>
	);
};
