import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
	answerCoordinatesToString,
	clearBoard,
	drawApple,
	drawSnake,
	generateRandomApplePosition,
	hasSnakeCollided,
	hideAnswerCoordinatesString,
	isAppleEaten,
} from "@src/components/board/utils";
import { AnswerCoordinates, Coordinates } from "@src/components/board/types";
import { Controls } from "@src/components/controls/controls";
import { useBoardSize } from "@src/components/board/hooks/useBoardSize";
import { useSnake } from "@src/components/board/hooks/useSnake";

interface Props {
	coordinates: AnswerCoordinates;
}

export const Board: FC<Props> = ({ coordinates }) => {
	const coordinatesString = answerCoordinatesToString(coordinates);

	const [score, setScore] = useState(0);
	const [size, parentRef] = useBoardSize();
	const [snake, moveSnake, increaseSnake, resetSnake] = useSnake(size);
	const [apple, setApple] = useState<Coordinates>(generateRandomApplePosition(size, snake.coordinates));
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
	const [answerCoordinatesString, setAnswerCoordinatesString] = useState<string>(
		hideAnswerCoordinatesString(coordinatesString),
	);

	const boardRef = useRef<HTMLCanvasElement | null>(null);

	const resetBoard = useCallback(() => {
		resetSnake();
		setApple(generateRandomApplePosition(size, snake.coordinates));
		setAnswerCoordinatesString(hideAnswerCoordinatesString(coordinatesString));
		setScore(0);
	}, [coordinatesString, resetSnake, size, snake.coordinates]);

	const handleIsAppleEaten = useCallback(() => {
		setApple(generateRandomApplePosition(size, snake.coordinates));
		setScore(prev => prev + 1);
		increaseSnake(score % 2 == 0);
	}, [increaseSnake, score, size, snake.coordinates]);

	useEffect(() => {
		setContext(boardRef.current && boardRef.current.getContext("2d"));
		clearBoard(context, size);
		drawSnake(context, snake.coordinates);
		drawApple(context, apple);

		if (isAppleEaten(apple, snake.coordinates[0])) {
			return handleIsAppleEaten();
		}

		if (hasSnakeCollided(snake.coordinates, size) && !!snake.direction) {
			return resetBoard();
		}
	}, [apple, context, size, resetBoard, snake, handleIsAppleEaten, answerCoordinatesString]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (snake.direction) {
				moveSnake(snake.direction)();
			}
		}, snake.speed);

		return () => clearInterval(interval);
	}, [moveSnake, snake.direction, snake.speed]);

	useEffect(() => {
		const index = score / 2 - 1;
		if (score <= 0 || index >= coordinatesString.length || score % 2 !== 0) {
			console.log("score", score, "coordinatesString.length", coordinatesString.length);
			return;
		}

		setAnswerCoordinatesString(
			prev => prev.slice(0, index) + coordinatesString[index] + prev.slice(index + 1, prev.length),
		);
	}, [coordinatesString, score]);

	useEffect(() => {
		setApple(generateRandomApplePosition(size, snake.coordinates));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [size]);

	return (
		<>
			<p className="text-xl font-bold">{answerCoordinatesString}</p>
			<div className="flex bg-board bg-center" ref={parentRef}>
				<canvas height={size.height} ref={boardRef} width={size.width} />
			</div>
			<Controls handleReset={resetBoard} handleMove={moveSnake} />
		</>
	);
};
