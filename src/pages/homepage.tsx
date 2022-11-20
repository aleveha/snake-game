import type { NextPage } from "next";
import { Intro } from "@src/components/intro";
import { Board } from "@src/components/board/board";
import { AnswerCoordinates } from "@src/components/board/types";

const coordinates: AnswerCoordinates = {
	latitude: {
		degrees: 41,
		minutes: 16,
		seconds: 4.6,
	},
	longitude: {
		degrees: 32,
		minutes: 3,
		seconds: 34.8,
	},
};

const HomePage: NextPage = () => {
	return (
		<div className="ui-container space-y-8 py-8">
			<Intro />
			<Board coordinates={coordinates} />
		</div>
	);
};

export const Page = HomePage;
