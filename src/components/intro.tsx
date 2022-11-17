import React, { FC } from "react";

export const Intro: FC = () => (
	<div className="flex w-full flex-col items-center justify-center space-y-4">
		<h1 className="text-3xl">Had (počítačová hra)</h1>
		<p className="text-center">
			Had je druh počítačové arkádové hry ve které hráč ovládá pohyby hada na obdélníkové ploše. Historie herního
			konceptu sahá do 70. let. Hru zpopularizovala v 90. letech firma Nokia, která nabízela vlastní verzi hry ve
			svých mobilních telefonech.
		</p>
	</div>
);
