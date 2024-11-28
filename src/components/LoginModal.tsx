"use client";
import Login from "./Login2";

const LoginModal = ({ setisLoginModal, setUsername, setisLoggedIn }: any) => {
	return (
		<>
			<div className="w-full min-h-[100vh] top-0 left-0 fixed flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
				{/* <div className="w-full bg-white/50 backdrop-blur-md rounded p-4 flex flex-col space-y-4 items-center justify-center overflow-scroll">
				</div> */}
				<Login
					setUsername={setUsername}
					setisLoginModal={setisLoginModal}
					setisLoggedIn={setisLoggedIn}
				/>
			</div>
		</>
	);
};

export default LoginModal;
