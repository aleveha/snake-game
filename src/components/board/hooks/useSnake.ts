import { Coordinates, Direction, Size, Snake, SNAKE_SIZE } from "@src/components/board/types";
import { useCallback, useMemo, useState } from "react";
import { calculateWidth } from "@src/components/board/utils";

export const useSnake = (size: Size) => {
	const snakeDefaultCoordinates: Coordinates[] = useMemo(
		() => [{ x: calculateWidth(size.width / 2), y: calculateWidth(size.height / 2) }],
		[size],
	);

	const [snake, setSnake] = useState<Snake>({ coordinates: snakeDefaultCoordinates, direction: null, speed: 400 });

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
				setSnake(prev => ({ ...prev, coordinates: makeMovement(SNAKE_SIZE, 0), direction: "right" }));
				return;
			}

			if (newDirection === "left" && snake.direction !== "right") {
				setSnake(prev => ({ ...prev, coordinates: makeMovement(-SNAKE_SIZE, 0), direction: "left" }));
				return;
			}

			if (newDirection === "up" && snake.direction !== "down") {
				setSnake(prev => ({ ...prev, coordinates: makeMovement(0, -SNAKE_SIZE), direction: "up" }));
				return;
			}

			if (newDirection === "down" && snake.direction !== "up") {
				setSnake(prev => ({ ...prev, coordinates: makeMovement(0, SNAKE_SIZE), direction: "down" }));
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
					xDiff = -SNAKE_SIZE;
					break;
				case "right":
					xDiff = SNAKE_SIZE;
					break;
				case "up":
					yDiff = -SNAKE_SIZE;
					break;
				case "down":
					yDiff = SNAKE_SIZE;
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
			speed: prev.speed > 10 ? prev.speed - 10 : prev.speed,
		}));
	}, [snake]);

	const resetSnake = useCallback(() => {
		setSnake({ coordinates: snakeDefaultCoordinates, direction: null, speed: 400 });
	}, [snakeDefaultCoordinates]);

	return [snake, moveSnake, increaseSnake, resetSnake] as const;
};
