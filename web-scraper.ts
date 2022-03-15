import {Client} from "@petfinder/petfinder-js";
import * as DataStore from "nedb";

export default class WebScraper {
    static async initDb() {
        const client = new Client({
            apiKey: 'J5ghTdk0wsSEZ78v7IEKlcerSJ8YM6UEHPtAoXA0QfGENgMzac',
            secret: 'Xiid7lRGw1LWrQNeXWkgvjkTrOFcPDPDvh6GHFNc',
        });
        const response = await client.animal.search({
            type: 'Dog',
            age: 'baby',
            limit: 100
        });


        const animals = await response.data.animals.filter((animal: any) => {
            return animal.primary_photo_cropped?.large != null;
        }).map((animal: any) => {
            if (animal.primary_photo_cropped?.large) {
                return {
                    name: animal.name,
                    photo: animal.primary_photo_cropped?.large,
                    score: 1200
                }
            }

            return false;
        })
        // @ts-ignore
        const db = new DataStore({ filename: './public/database.db', autoload: true });

        db.insert(animals,  (err: any, newDoc: any) => {   // Callback is optional
            console.log(err, newDoc)
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
        });
    }
}

WebScraper.initDb()
