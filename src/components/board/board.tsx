import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
	clearBoard,
	drawApple,
	drawMap,
	drawSnake,
	generateRandomPosition,
	hasSnakeCollided,
} from "@src/components/board/utils";
import mapImage from "public/static/images/map.png";
import { Coordinates, Direction, Snake } from "@src/components/board/types";
import { Controls } from "@src/components/controls/controls";

interface Props {
	height: number;
	width: number;
}

const snakeDefaultCoordinates: Coordinates[] = [{ x: 300, y: 200 }];

export const Board: FC<Props> = ({ height, width }) => {
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
	const [apple, setApple] = useState<Coordinates>(generateRandomPosition(width - 20, height - 20));
	const [snake, setSnake] = useState<Snake>({ coordinates: snakeDefaultCoordinates, direction: null });

	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const makeMovement = useCallback(
		(dx = 0, dy = 0): Coordinates[] => {
			const newSnake = [
				{
					x: snake.coordinates[0].x + dx,
					y: snake.coordinates[0].y + dy,
				},
				...snake.coordinates,
			];
			newSnake.pop();
			console.log(newSnake[0]);
			return newSnake;
		},
		[snake.coordinates],
	);

	const moveSnake = useCallback(
		(newDirection: Direction) => () => {
			if (newDirection === "right" && snake.direction !== "left") {
				setSnake({ coordinates: makeMovement(20, 0), direction: "right" });
				return;
			}

			if (newDirection === "left" && snake.direction !== "right") {
				setSnake({ coordinates: makeMovement(-20, 0), direction: "left" });
				return;
			}

			if (newDirection === "up" && snake.direction !== "down") {
				setSnake({ coordinates: makeMovement(0, -20), direction: "up" });
				return;
			}

			if (newDirection === "down" && snake.direction !== "up") {
				setSnake({ coordinates: makeMovement(0, 20), direction: "down" });
				return;
			}
		},
		[snake.direction, makeMovement],
	);

	const increaseSnake = useCallback(() => {
		let xDiff = 0;
		let yDiff = 0;
		const { coordinates, direction } = snake;

		if (coordinates.length === 1) {
			switch (direction) {
				case "left":
					xDiff = -20;
					break;
				case "right":
					xDiff = 20;
					break;
				case "up":
					yDiff = -20;
					break;
				case "down":
					yDiff = 20;
					break;
			}
		} else {
			xDiff = coordinates[coordinates.length - 2].x - coordinates[coordinates.length - 1].x;
			yDiff = coordinates[coordinates.length - 2].y - coordinates[coordinates.length - 1].y;
		}

		setSnake(prev => ({
			...prev,
			coordinates: [
				...prev.coordinates,
				{
					x: prev.coordinates[prev.coordinates.length - 1].x - xDiff,
					y: prev.coordinates[prev.coordinates.length - 1].y - yDiff,
				},
			],
		}));
	}, [snake]);

	const resetBoard = useCallback(() => {
		setSnake({
			coordinates: snakeDefaultCoordinates,
			direction: null,
		});
		setApple(generateRandomPosition(width - 20, height - 20));
	}, [height, width]);

	useEffect(() => {
		setContext(canvasRef.current && canvasRef.current.getContext("2d"));
		clearBoard(context, height, width);
		drawMap(context, mapImage);
		drawSnake(context, snake.coordinates);
		drawApple(context, apple);

		if (snake.coordinates[0].x === apple.x && snake.coordinates[0].y === apple.y) {
			setApple(generateRandomPosition(width - 20, height - 20));
			increaseSnake();
		}

		if (
			hasSnakeCollided(snake.coordinates) ||
			snake.coordinates[0].x >= width - 20 ||
			snake.coordinates[0].x <= -40 ||
			snake.coordinates[0].y <= -40 ||
			snake.coordinates[0].y >= height - 20
		) {
			resetBoard();
		}
	}, [apple, context, height, increaseSnake, resetBoard, snake.coordinates, width]);

	return (
		<>
			<canvas className="border border-black" height={height} ref={canvasRef} width={width} />
			<Controls handleReset={resetBoard} handleMove={moveSnake} />
		</>
	);
};
