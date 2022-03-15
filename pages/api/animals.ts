import type { NextApiRequest, NextApiResponse } from 'next'
import DataStore from "nedb";
import path from "path";

type Data = {
    message?: string
    animals?: Animal[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const filePath = path.join(process.cwd(), 'database/database.db');
    const db = new DataStore({ filename: filePath, autoload: true });

    db.find({},  (err: any, docs: Animal[]) => {
        if (err) {
            return res.status(200).json({message: 'Could not retrieve records'})
        }

        return res.status(200).json({animals: docs})
    });
}
