// next.config.mjs

import withPWA from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true, // Enable React strict mode for improved error handling
	swcMinify: true, // Enable SWC minification for improved performance
};

export default withPWA({
	api: {
		bodyParser: false, // Disable the default body parser for API routes
		logging: {
			fetches: {
				fullUrl: true, // Log full URLs for fetch requests
			},
		},
	},
	logging: {
		fetches: {
			fullUrl: true, // Log full URLs for fetch requests
		},
	},
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	cacheStartUrl: true,
	dest: "/public", // destination directory for the PWA files
	customWorkerSrc: "service-worker",
	customWorkerDest: "/public",
	disable: process.env.NODE_ENV === "development", // disable PWA in the development environment
	register: true, // register the PWA service worker
	skipWaiting: true, // skip waiting for service worker activation
})(nextConfig);
