import type {NextApiRequest, NextApiResponse} from 'next'
import Elo from '@studimax/elo';
import DataStore from "nedb";
import path from "path";


type Data = {
    message?: string
    animalOne?: Animal
    animalTwo?: Animal
}

type Body = {
    winner: Animal
    loser: Animal
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method != 'POST') {
        res.status(405).json({message: 'POST method only'})
    }
    const elo = new Elo();
    // calculate elo score
    const body: Body = JSON.parse(req.body);

    const winner = body.winner
    const loser = body.loser

    const {Ra, Rb} = elo.calculateRating(winner.score, loser.score, 1);

    const filePath = path.join(process.cwd(), 'database/database.db');
    const db = new DataStore({ filename: filePath, autoload: true });

    const update = async () => {
        db.update({_id: winner._id}, {$set: {score: Ra}}, {}, (err, numReplaced) => {
            if (err) {
                res.status(400).json({message: 'Could not update winner'})
            }
        })
        db.update({_id: loser._id}, {$set: {score: Rb}},  {},(err, numReplaced) => {
            if (err) {
                res.status(400).json({message: 'Could not update loser'})
            }
        })
    }

    await update()


    db.find({},  (err: any, docs: Animal[]) => {
        const shuffled = docs.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 2);
        res.status(200).json({animalOne: selected[0], animalTwo: selected[1]})
    })
}
