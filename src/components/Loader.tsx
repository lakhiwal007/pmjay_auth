"use client";
import { ImSpinner9 } from "react-icons/im";

const Loader = () => {
	return (
		<>
			<div className="w-full min-h-[100vh] top-0 left-0 fixed flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
				<div className="w-40 h-40 bg-white/50 backdrop-blur-md rounded p-4 flex flex-col space-y-4 items-center justify-center">
					<ImSpinner9 className="w-14 h-14 text-sky-800 animate-spin" />
					<p className="font-semibold">Loading...</p>
				</div>
			</div>
		</>
	);
};

export default Loader;