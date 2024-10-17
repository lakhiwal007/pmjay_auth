// lib/cors-middleware.js
import NextCors from "nextjs-cors";

export default async function cors(req, res) {
	await NextCors(req, res, {
		methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
		origin: "*",
		optionsSuccessStatus: 200,
	});
}
