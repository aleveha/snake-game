import React, { FC, useEffect, useState } from "react";
import { answerCoordinatesToString, hideAnswerCoordinatesString } from "@src/components/board/utils";
import { AnswerCoordinates } from "@src/components/board/types";
import { useBoardSize } from "@src/components/board/hooks/useBoardSize";
import { Canvas } from "@src/components/board/canvas";
import { Controls } from "@src/components/controls/controls";

interface Props {
	coordinates: AnswerCoordinates;
}

export const Board: FC<Props> = ({ coordinates }) => {
	const coordinatesString = answerCoordinatesToString(coordinates);

	const [boardSize, parentRef] = useBoardSize();
	const [score, setScore] = useState(0);

	const [answerCoordinatesString, setAnswerCoordinatesString] = useState<string>(
		hideAnswerCoordinatesString(coordinatesString),
	);

	useEffect(() => {
		const index = score / 2 - 1;
		if (score <= 0 || index >= coordinatesString.length || score % 2 !== 0) {
			return;
		}

		setAnswerCoordinatesString(
			prev => prev.slice(0, index) + coordinatesString[index] + prev.slice(index + 1, prev.length),
		);
	}, [coordinatesString, score]);

	return (
		<>
			<p className="text-xl font-bold">{answerCoordinatesString}</p>
			<div className="flex bg-board bg-center" ref={parentRef}>
				{boardSize && (
					<Canvas
						boardSize={boardSize}
						coordinatesString={coordinatesString}
						handleCoordinatesString={setAnswerCoordinatesString}
						handleScore={setScore}
					/>
				)}
			</div>
			<Controls />
		</>
	);
};
