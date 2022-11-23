import { Coordinates, Direction, Size, Snake, SNAKE_SIZE } from "@src/components/board/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { calculateBoardWidth } from "@src/components/board/utils";

export const useSnake = (size: Size) => {
	const snakeDefault: Snake = useMemo(
		() => ({
			coordinates: [{ x: calculateBoardWidth(size.width / 2), y: calculateBoardWidth(size.height / 2) }],
			direction: null,
			size: size.width === size.height ? SNAKE_SIZE / 2 : SNAKE_SIZE,
			speed: 400,
		}),
		[size],
	);

	const [snake, setSnake] = useState<Snake>(snakeDefault);

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
			return newSnake;
		},
		[snake.coordinates],
	);

	const moveSnake = useCallback(
		(newDirection: Direction) => () => {
			if (newDirection === "right" && snake.direction !== "left") {
				setSnake(prev => ({ ...prev, coordinates: makeMovement(snake.size, 0), direction: "right" }));
				return;
			}

			if (newDirection === "left" && snake.direction !== "right") {
				setSnake(prev => ({ ...prev, coordinates: makeMovement(-snake.size, 0), direction: "left" }));
				return;
			}

			if (newDirection === "up" && snake.direction !== "down") {
				setSnake(prev => ({ ...prev, coordinates: makeMovement(0, -snake.size), direction: "up" }));
				return;
			}

			if (newDirection === "down" && snake.direction !== "up") {
				setSnake(prev => ({ ...prev, coordinates: makeMovement(0, snake.size), direction: "down" }));
				return;
			}
		},
		[snake.direction, snake.size, makeMovement],
	);

	const increaseSnake = useCallback(
		(increaseSpeed = false) => {
			let xDiff = 0;
			let yDiff = 0;
			const { coordinates, direction } = snake;

			if (coordinates.length === 1) {
				switch (direction) {
					case "left":
						xDiff = -snake.size;
						break;
					case "right":
						xDiff = snake.size;
						break;
					case "up":
						yDiff = -snake.size;
						break;
					case "down":
						yDiff = snake.size;
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
				speed: prev.speed > 100 && increaseSpeed ? prev.speed - 20 : prev.speed,
			}));
		},
		[snake],
	);

	const resetSnake = useCallback(() => {
		setSnake(snakeDefault);
	}, [snakeDefault]);

	const latestMoveSnake = useRef(moveSnake);
	latestMoveSnake.current = moveSnake;

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			switch (event.key) {
				case "w":
				case "ArrowUp":
					event.preventDefault();
					latestMoveSnake.current("up")();
					break;
				case "s":
				case "ArrowDown":
					event.preventDefault();
					latestMoveSnake.current("down")();
					break;
				case "a":
				case "ArrowLeft":
					event.preventDefault();
					latestMoveSnake.current("left")();
					break;
				case "d":
				case "ArrowRight":
					event.preventDefault();
					latestMoveSnake.current("right")();
					break;
			}
		};

		window.addEventListener("keypress", handler);
		window.addEventListener("keydown", handler);

		return () => {
			window.removeEventListener("keypress", handler);
			window.removeEventListener("keydown", handler);
		};
	}, [latestMoveSnake]);

	return [snake, moveSnake, increaseSnake, resetSnake] as const;
};
