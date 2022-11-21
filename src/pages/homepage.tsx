import type { NextPage } from "next";
import { Intro } from "@src/components/intro";
import { Board } from "@src/components/board/board";
import { AnswerCoordinates } from "@src/components/board/types";

export interface HomePageProps {
	coordinates: AnswerCoordinates;
}

const HomePage: NextPage<HomePageProps> = ({ coordinates }) => {
	return (
		<div className="ui-container space-y-8 py-8">
			<Intro />
			<Board coordinates={coordinates} />
		</div>
	);
};

export const Page = HomePage;
