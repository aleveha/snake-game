export const SNAKE_SIZE = 20;

export type Direction = "up" | "down" | "left" | "right";

export interface Size {
	height: number;
	width: number;
}

export interface Coordinates {
	x: number;
	y: number;
}

export interface Snake {
	coordinates: Coordinates[];
	direction: Direction | null;
	speed: number;
}
