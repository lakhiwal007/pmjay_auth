import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "PMJAY_AUTH",
		short_name: "PMJAY_AUTH",
		description: "An example of a PWA using Next.js and TypeScript",
		start_url: "/",
		scope: "/",
		display: "standalone",
		background_color: "#FFFFFF",
		theme_color: "#FFFFFF",
		orientation: "portrait",
		icons: [
			{
				src: "/icons/pmjay_logo-192.png",
				type: "image/png",
				sizes: "192x192",
			},
			{
				src: "/icons/pmjay_logo-256.png",
				type: "image/png",
				sizes: "256x256",
			},
			{
				src: "/icons/pmjay_logo-512.png",
				type: "image/png",
				sizes: "512x512",
			},
		],
	};
}
