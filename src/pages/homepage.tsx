import type { NextPage } from "next";
import { Intro } from "@src/components/intro";
import { Board } from "@src/components/board/board";

const HomePage: NextPage = () => {
	return (
		<div className="ui-container space-y-8 py-8">
			<Intro />
			<Board />
		</div>
	);
};

export const Page = HomePage;
