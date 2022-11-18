import type { NextPage } from "next";
import { Intro } from "@src/components/intro";
import { Board } from "@src/components/board/board";

const HomePage: NextPage = () => {
	return (
		<div className="ui-container flex min-h-screen flex-col space-y-8 py-8">
			<Intro />
			<Board height={560} width={1000} />
		</div>
	);
};

export const Page = HomePage;
