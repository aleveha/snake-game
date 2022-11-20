import { Direction } from "@src/components/board/types";

const upIcon = (
	<svg className="h-8 w-8" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
	</svg>
);

const downIcon = (
	<svg className="h-8 w-8" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
	</svg>
);

const leftIcon = (
	<svg className="h-8 w-8" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
	</svg>
);

const rightIcon = (
	<svg className="h-8 w-8" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
	</svg>
);

const resetIcon = (
	<svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
		/>
	</svg>
);

type DirectionIcons = {
	[key in Direction]: JSX.Element;
};

interface Icons extends DirectionIcons {
	reset: JSX.Element;
}

export type Icon = keyof Icons;

export const ICONS: Icons = {
	up: upIcon,
	down: downIcon,
	left: leftIcon,
	right: rightIcon,
	reset: resetIcon,
} as const;
