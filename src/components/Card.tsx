import React from "react";

const Card = ({
	onClickFn,
	Icon,
	Title,
	classNameButton,
	classNameIcon,
	Count = 0,
}: any) => {
	return (
		<button
			type="button"
			onClick={onClickFn}
			className={`w-full relative font-semibold max-w-70 min-h-[100px] border-[1px] rounded-lg p-4 shadow-sm flex flex-col items-start justify-start active:shadow-lg cursor-pointer ${classNameButton} ${classNameIcon}`}
		>
			<Icon
				className={`w-12 h-12 absolute right-2 top-auto ${classNameIcon}`}
			/>
			<p className="font-semibold">{Title}</p>
			<p className="font-bold text-4xl ml-2">{Count}</p>
		</button>
	);
};

export default Card;
