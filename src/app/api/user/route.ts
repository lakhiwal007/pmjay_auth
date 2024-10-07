import { apiGet, apiPost } from "../database";

export async function POST(req: Request, res: Response) {
	const body = await req.json();
	const { name, address, gender, dob } = body;

	const query = `
    INSERT INTO users(name, address, gender, dob)
    VALUES(?, ?, ?, ?)
  `;
	const values = [name, address, gender, dob];

	let status, respBody;
	await apiPost(query, values)
		.then(() => {
			status = 200;
			respBody = { message: "Successfully added user" };
		})
		.catch((err) => {
			status = 400;
			respBody = err;
		});
	return Response.json(respBody, {
		status,
	});
}

export async function GET(req: Request, res: Response) {
	const query = `
       SELECT * from users
     `;

	let status, body;
	try {
		await apiGet(query)
			.then((res) => {
				status = 200;
				body = res;
			})
			.catch((err: Error) => {
				status = 400;
				body = { error: err };
			});
		return Response.json(body, {
			status,
		});
	} catch (error: any) {
		console.error(error.message);
		return Response.json(
			{ error: error },
			{
				status: 400,
			}
		);
	}
}
