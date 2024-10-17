import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
	manifest: "/manifest.json",
};

const myFont = localFont({ src: "./fonts/Montserrat-Medium.ttf" });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={myFont.className}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
