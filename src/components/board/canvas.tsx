import { Coordinates, Size } from "@src/components/board/types";
import { useSnake } from "@src/components/board/hooks/useSnake";
import { getRandomCoordinates, hasSnakeCollided, hideAnswerCoordinatesString } from "@src/components/board/utils";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { controlsAtom } from "@src/states/controls-atom";
import { useAtom } from "jotai";

interface Props {
	boardSize: Size;
	coordinatesString: string;
	handleCoordinatesString: (coordinatesString: string) => void;
	handleScore: Dispatch<SetStateAction<number>>;
}

export const Canvas: FC<Props> = ({ boardSize, coordinatesString, handleCoordinatesString, handleScore }) => {
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
	const [snake, moveSnake, increaseSnake, resetSnake] = useSnake(boardSize);
	const [apple, setApple] = useState<Coordinates>({ x: 0, y: 0 });
	const [, setControlsState] = useAtom(controlsAtom);

	const boardRef = useRef<HTMLCanvasElement | null>(null);

	const generateRandomApplePosition = useCallback(() => {
		let newApple = getRandomCoordinates(boardSize, snake.size);

		while (snake.coordinates.some(({ x, y }) => x === newApple.x && y === newApple.y)) {
			newApple = getRandomCoordinates(boardSize, snake.size);
		}

		return newApple;
	}, [boardSize, snake.coordinates, snake.size]);

	const resetBoard = useCallback(() => {
		resetSnake();
		setApple(generateRandomApplePosition());
		handleCoordinatesString(hideAnswerCoordinatesString(coordinatesString));
		handleScore(0);
	}, [resetSnake, generateRandomApplePosition, handleCoordinatesString, coordinatesString, handleScore]);

	const handleIsAppleEaten = useCallback(() => {
		setApple(generateRandomApplePosition());
		handleScore(prev => {
			increaseSnake(prev % 2 == 0);
			return prev + 1;
		});
	}, [generateRandomApplePosition, handleScore, increaseSnake]);

	const clearBoard = useCallback(() => {
		if (context) {
			context.clearRect(0, 0, boardSize.width, boardSize.height);
		}
	}, [boardSize, context]);

	const drawApple = useCallback(() => {
		if (context) {
			context.fillStyle = "#fb7185";
			context.strokeStyle = "gray";
			context.fillRect(apple.x + snake.size, apple.y + snake.size, snake.size, snake.size);
			context.strokeRect(apple.x + snake.size, apple.y + snake.size, snake.size, snake.size);
		}
	}, [apple, context, snake.size]);

	const drawSnake = useCallback(() => {
		if (context) {
			snake.coordinates.forEach((pos: Coordinates, index) => {
				if (index === 0) {
					context.fillStyle = "#65a30d";
				} else {
					context.fillStyle = "#a3e635";
				}
				context.strokeStyle = "gray";
				context.fillRect(pos.x + snake.size, pos.y + snake.size, snake.size, snake.size);
				context.strokeRect(pos.x + snake.size, pos.y + snake.size, snake.size, snake.size);
			});
		}
	}, [context, snake.coordinates, snake.size]);

	useEffect(() => {
		setContext(boardRef.current && boardRef.current.getContext("2d"));
		clearBoard();
		drawSnake();
		drawApple();

		if (apple.x === snake.coordinates[0].x && apple.y === snake.coordinates[0].y) {
			return handleIsAppleEaten();
		}

		if (hasSnakeCollided(snake.coordinates, boardSize, snake.size) && !!snake.direction) {
			return resetBoard();
		}
	}, [apple, context, boardSize, resetBoard, snake, handleIsAppleEaten, drawApple, clearBoard, drawSnake]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (snake.direction) {
				moveSnake(snake.direction)();
			}
		}, snake.speed);

		return () => clearInterval(interval);
	}, [moveSnake, snake.direction, snake.speed]);

	useEffect(() => {
		setControlsState({
			handleReset: resetBoard,
			handleMove: moveSnake,
		});
	}, [moveSnake, resetBoard, setControlsState]);

	return <canvas height={boardSize.height} ref={boardRef} width={boardSize.width} />;
};
