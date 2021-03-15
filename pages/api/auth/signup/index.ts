import prisma from 'lib/db/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcrypt";

export default async function signUp(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			await prisma.user.create({
				data: {
					name: `${req.body.firstname} ${req.body.lastname}`,
					email: req.body.email,
					password: await bcrypt.hash(req.body.password, 10)
				}
			});

			res.status(200).json({ statusCode: 200 });
		} catch (error) {
			res.status(500).json({ statusCode: 500, message: error.message });
		}
	}
	else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}