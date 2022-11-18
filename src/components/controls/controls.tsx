import React, { FC } from "react";
import { Button } from "@src/components/controls/button";
import { Direction } from "@src/components/board/types";
import { Badge } from "@src/components/ui/badge";

interface Props {
	handleMove: (direction: Direction) => () => void;
	handleReset: () => void;
}

export const Controls: FC<Props> = ({ handleMove, handleReset }) => (
	<div className="flex w-full flex-col-reverse justify-between md:flex-row">
		<div className="mt-14 flex h-fit w-full flex-col items-start justify-center space-y-5 md:mt-0 md:w-1/2">
			<div className="space-y-5">
				<p>
					<Badge>W | ⬆️</Badge> — posunout se nahoru
				</p>
				<p>
					<Badge>️S | ⬇️</Badge> — posunout se dolu
				</p>
				<p>
					<Badge>A | ⬅️</Badge> — posunout se vlevo
				</p>
				<p>
					<Badge>D | ➡️</Badge> — posunout se vpravo
				</p>
			</div>
			<button
				className="rounded-2xl bg-blue-600 py-3 px-6 text-lg text-white hover:bg-blue-700"
				onClick={handleReset}
			>
				Reset game
			</button>
		</div>
		<div className="grid grid-cols-3 grid-rows-2 gap-4 md:grid-rows-3 md:gap-0">
			<Button
				className="row-span-2 self-center md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3"
				direction="left"
				onClick={handleMove("left")}
			/>
			<Button className="col-start-2 col-end-3 row-start-1 row-end-2" direction="up" onClick={handleMove("up")} />
			<Button
				className="row-span-2 self-center md:col-start-3 md:col-end-4 md:row-start-2 md:row-end-3"
				direction="right"
				onClick={handleMove("right")}
			/>
			<Button
				className="col-start-2 col-end-3 row-start-2 row-end-3 md:row-start-3 md:row-end-4"
				direction="down"
				onClick={handleMove("down")}
			/>
		</div>
	</div>
);
