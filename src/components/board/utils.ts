import { AnswerCoordinates, Coordinates, Size, SNAKE_SIZE } from "@src/components/board/types";

function getRandomNumber(max: number, snakeSize: number): number {
	const random = Math.random() * (max - snakeSize);
	return random - (random % snakeSize);
}

export function getRandomCoordinates(size: Size, snakeSize: number): Coordinates {
	return {
		x: getRandomNumber(size.width - snakeSize, snakeSize),
		y: getRandomNumber(size.height - snakeSize, snakeSize),
	};
}

export function hasSnakeCollided(snake: Coordinates[], boardSize: Size, snakeSize: number): boolean {
	return (
		snake[0].x >= boardSize.width - snakeSize ||
		snake[0].x <= -2 * snakeSize ||
		snake[0].y <= -2 * snakeSize ||
		snake[0].y >= boardSize.height - snakeSize ||
		snake.findIndex(
			(pos: Coordinates, index: number) => pos.x === snake[0].x && pos.y === snake[0].y && index !== 0,
		) !== -1
	);
}

export function calculateBoardWidth(width: number): number {
	let newWidth = width;
	while (newWidth % SNAKE_SIZE !== 0) {
		newWidth -= 1;
	}
	return newWidth;
}

export function answerCoordinatesToString(coordinates: AnswerCoordinates): string {
	const { latitude, longitude } = coordinates;

	return (
		`${latitude.degrees > 0 ? "N" : "S"}${latitude.degrees}°${latitude.minutes}'${latitude.seconds}" ` +
		`${longitude.degrees > 0 ? "E" : "W"}${longitude.degrees}°${longitude.minutes}'${longitude.seconds}"`
	);
}

export function hideAnswerCoordinatesString(value: string): string {
	return value
		.split(" ")
		.map(coor => "X".repeat(coor.length))
		.join(" ");
}
