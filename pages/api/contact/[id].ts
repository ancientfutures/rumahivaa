import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const noteId = req.query.id

	if(req.method === 'DELETE') {
		const contact = await prisma.contact.delete({
			where: {id: Number(noteId)}
		})
		res.json(contact)
	} else {
		console.log("Note could not be created");
	}
}