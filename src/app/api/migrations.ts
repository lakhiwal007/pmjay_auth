// /src/app/api/migrations.ts

import { db } from "./database";

export const migrate = () => {
	db.serialize(() => {
		db.run(
			`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        gender TEXT NOT NULL,
        dob TEXT NOT NULL,
        
      );
    `,
			(err: Error) => {
				if (err) {
					console.error(err.message);
				}
				console.log("user table created successfully.");
			}
		);
	});
};
