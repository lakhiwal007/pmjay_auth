import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import cors from "../lib/cors-middleware";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    console.log(req.method)
	await cors(req, res);

	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	const { username, password } = req.body;

	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Username and password are required" });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { username },
		});

		if (!user) {
			return res
				.status(401)
				.json({ message: "Invalid username or password" });
		}

		// Check if password is correct
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return res
				.status(401)
				.json({ message: "Invalid username or password" });
		}

		res.status(200).json({
			message: "Login successful",
			user: { id: user.id, username: user.username },
		});
	} catch (error) {
		console.error("Error logging in:", error);
		res.status(500).json({ message: "Error logging in" });
	} finally {
		await prisma.$disconnect();
	}
}
