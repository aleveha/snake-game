import type { NextPage } from "next";
import { Intro } from "@src/components/intro";
import { Board } from "@src/components/board";
import { Controls } from "@src/components/controls/controls";

const HomePage: NextPage = () => {
	return (
		<div className="ui-container flex min-h-screen flex-col space-y-12 py-8">
			<Intro />
			<Board />
			<Controls />
		</div>
	);
};

export const Page = HomePage;
