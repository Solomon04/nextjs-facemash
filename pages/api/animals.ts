import type { NextApiRequest, NextApiResponse } from 'next'
import DataStore from "nedb";

type Data = {
    message?: string
    animals?: Animal[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const db = new DataStore({ filename: './database.db', autoload: true });

    db.find({},  (err: any, docs: Animal[]) => {
        if (err) {
            return res.status(200).json({message: 'Could not retrieve records'})
        }

        return res.status(200).json({animals: docs})
    });
}
