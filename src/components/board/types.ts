export type Direction = "up" | "down" | "left" | "right";

export interface Coordinates {
	x: number;
	y: number;
}

export interface Snake {
	coordinates: Coordinates[];
	direction: Direction | null;
}
