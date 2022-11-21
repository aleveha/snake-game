import { Page } from "@src/pages/homepage";
import { AnswerCoordinates } from "@src/components/board/types";

const coordinates: AnswerCoordinates = {
	latitude: {
		degrees: 11,
		minutes: 16,
		seconds: 4.6,
	},
	longitude: {
		degrees: 32,
		minutes: 3,
		seconds: 34.8,
	},
};

export const getStaticProps = async () => {
	return {
		props: {
			coordinates,
		},
	};
};

export default Page;
