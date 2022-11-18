import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
	clearBoard,
	drawApple,
	drawSnake,
	generateRandomApplePosition,
	hasSnakeCollided,
	isAppleEaten,
} from "@src/components/board/utils";
import { Coordinates, SNAKE_SIZE } from "@src/components/board/types";
import { Controls } from "@src/components/controls/controls";
import { useBoardSize } from "@src/components/board/hooks/useBoardSize";
import { useSnake } from "@src/components/board/hooks/useSnake";

export const Board: FC = () => {
	const [size, parentRef] = useBoardSize();
	const [snake, moveSnake, increaseSnake, resetSnake] = useSnake(size);
	const [apple, setApple] = useState<Coordinates>(generateRandomApplePosition(size, snake.coordinates));
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

	const boardRef = useRef<HTMLCanvasElement | null>(null);

	const resetBoard = useCallback(() => {
		resetSnake();
		setApple(generateRandomApplePosition(size, snake.coordinates));
	}, [resetSnake, size, snake.coordinates]);

	useEffect(() => {
		setContext(boardRef.current && boardRef.current.getContext("2d"));
		clearBoard(context, size.height, size.width);
		drawSnake(context, snake.coordinates);
		drawApple(context, apple);

		if (isAppleEaten(apple, snake.coordinates[0])) {
			setApple(generateRandomApplePosition(size, snake.coordinates));
			increaseSnake();
		}

		if (
			hasSnakeCollided(snake.coordinates) ||
			snake.coordinates[0].x >= size.width - SNAKE_SIZE ||
			snake.coordinates[0].x <= -2 * SNAKE_SIZE ||
			snake.coordinates[0].y <= -2 * SNAKE_SIZE ||
			snake.coordinates[0].y >= size.height - SNAKE_SIZE
		) {
			resetBoard();
		}
	}, [apple, context, size, increaseSnake, resetBoard, snake.coordinates]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (snake.direction) {
				moveSnake(snake.direction)();
			}
		}, snake.speed);
		return () => clearInterval(interval);
	}, [moveSnake, snake.direction, snake.speed]);

	return (
		<>
			<div className="flex bg-board bg-center" ref={parentRef}>
				<canvas height={size.height} ref={boardRef} width={size.width} />
			</div>
			<Controls handleReset={resetBoard} handleMove={moveSnake} />
		</>
	);
};
