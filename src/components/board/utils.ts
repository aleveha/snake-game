import { Coordinates, Size, SNAKE_SIZE } from "@src/components/board/types";

// Board
export function clearBoard(context: CanvasRenderingContext2D | null, height: number, width: number): void {
	if (context) {
		context.clearRect(0, 0, width, height);
	}
}

// Apple
function getRandomNumber(max: number): number {
	const random = Math.random() * (max - SNAKE_SIZE);
	return random - (random % SNAKE_SIZE);
}

function getRandomCoordinates(width: number, height: number): Coordinates {
	return {
		x: getRandomNumber(width - SNAKE_SIZE),
		y: getRandomNumber(height - SNAKE_SIZE),
	};
}

export function generateRandomApplePosition(size: Size, snake: Coordinates[]): Coordinates {
	let newApple = getRandomCoordinates(size.width, size.height);

	while (snake.some(({ x, y }) => x === newApple.x && y === newApple.y)) {
		newApple = getRandomCoordinates(size.width, size.height);
	}

	return newApple;
}

export function drawApple(context: CanvasRenderingContext2D | null, object: Coordinates): void {
	if (context) {
		context.fillStyle = "#fb7185";
		context.strokeStyle = "gray";
		context.fillRect(object.x + SNAKE_SIZE, object.y + SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
		context.strokeRect(object.x + SNAKE_SIZE, object.y + SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
	}
}

export function isAppleEaten(apple: Coordinates, snakeHead: Coordinates): boolean {
	return apple.x === snakeHead.x && apple.y === snakeHead.y;
}

// Snake
export function drawSnake(context: CanvasRenderingContext2D | null, object: Coordinates[]): void {
	if (context) {
		object.forEach((pos: Coordinates, index) => {
			if (index === 0) {
				context.fillStyle = "#65a30d";
			} else {
				context.fillStyle = "#a3e635";
			}
			context.strokeStyle = "gray";
			context.fillRect(pos.x + SNAKE_SIZE, pos.y + SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
			context.strokeRect(pos.x + SNAKE_SIZE, pos.y + SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
		});
	}
}

export function hasSnakeCollided(snake: Coordinates[]): boolean {
	return (
		snake.findIndex(
			(pos: Coordinates, index: number) => pos.x === snake[0].x && pos.y === snake[0].y && index !== 0,
		) !== -1
	);
}

export function calculateWidth(width: number): number {
	let newWidth = width;
	while (newWidth % SNAKE_SIZE !== 0) {
		newWidth -= 1;
	}
	return newWidth;
}
