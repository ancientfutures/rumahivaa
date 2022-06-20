import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const {email, firstname, lastname, instance} = req.body
	try {
		await prisma.contact.create({
			data: {
				email,
				firstname,
				lastname,
				instance
			}
		})
		res.status(200).json({message: 'Visitor Created'})
	} catch (error) {
		console.log("Failure");
	}
}