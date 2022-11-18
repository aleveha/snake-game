import { StaticImageData } from "next/image";
import { Coordinates } from "@src/components/board/types";

// Board
export function clearBoard(context: CanvasRenderingContext2D | null, height: number, width: number): void {
	if (context) {
		context.clearRect(0, 0, width, height);
	}
}

export function drawMap(context: CanvasRenderingContext2D | null, image: StaticImageData): void {
	if (context) {
		const img = new Image();
		img.src = image.src;
		img.onload = async () => {
			const bitmap = await createImageBitmap(img, 0, 0, image.width, image.height);
			context.globalCompositeOperation = "destination-over";
			context.drawImage(bitmap, -150, -60);
		};
	}
}

// Apple
function randomNumber(max: number): number {
	const random = Math.random() * (max - 20);
	return random - (random % 20);
}

export function generateRandomPosition(width: number, height: number): Coordinates {
	return {
		x: randomNumber(width),
		y: randomNumber(height),
	};
}

export function drawApple(context: CanvasRenderingContext2D | null, object: Coordinates): void {
	if (context) {
		context.fillStyle = "#fb7185";
		context.strokeStyle = "gray";
		context.fillRect(object.x + 20, object.y + 20, 20, 20);
		context.strokeRect(object.x + 20, object.y + 20, 20, 20);
	}
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
			context.fillRect(pos.x + 20, pos.y + 20, 20, 20);
			context.strokeRect(pos.x + 20, pos.y + 20, 20, 20);
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
