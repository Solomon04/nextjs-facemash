import type { NextApiRequest, NextApiResponse } from 'next'
import DataStore from "nedb";
import path from "path";
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()
const { join, resolve } = require("path");

type Data = {
    message?: string
    animals?: Animal[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const databaseDirectory = resolve(process.cwd(), "database");
    const db = new DataStore({ filename: join(databaseDirectory, "database.db"), autoload: true });

    db.find({},  (err: any, docs: Animal[]) => {
        if (err) {
            return res.status(200).json({message: 'Could not retrieve records'})
        }

        return res.status(200).json({animals: docs})
    });
}
