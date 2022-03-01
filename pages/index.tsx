import type {NextPage} from 'next'
import {useEffect, useState} from "react";

const Home: NextPage = () => {
    const [animals, setAnimals] = useState([]);
    const [animalOne, setAnimalOne] = useState<Animal|undefined>();
    const [animalTwo, setAnimalTwo] = useState<Animal|undefined>();

    const getAnimals = async () => {
        const res = await fetch('/api/animals', {
            method: 'GET'
        });

        const data = await res.json();
        setAnimals(data.animals)
        // randomize animals
        const shuffled = animals.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 2);
        setAnimalOne(selected[0])
        setAnimalTwo(selected[1])
    }


    useEffect(() => {
        if (!animalOne && !animalTwo) {
            getAnimals()
        }
    })

    const selectBestAnimal = async (w?: Animal, l?: Animal) => {
        const res = await fetch('/api/rank', {
            method: 'POST',
            body: JSON.stringify({
                winner: w,
                loser: l
            })
        })
        const data = await res.json();
        setAnimalOne(data.animalOne)
        setAnimalTwo(data.animalTwo)
    }

    return (
        <main>
            <div className="bg-[#890304] w-full py-4 flex items-center justify-between px-5">
                <a href="/" className="text-white text-center font-bold text-3xl uppercase cursor-pointer">DogMash 🐶</a>
                <a href="/rankings" className="text-white font-semibold uppercase text-lg cursor-pointer">Rankings</a>
            </div>
            <div className="max-w-3xl mx-auto py-16">
                <h3 className="font-bold text-3xl text-center">Who's Cuter? Click to Choose</h3>
                <div className="flex pt-8">
                    <a onClick={e => selectBestAnimal(animalOne, animalTwo)} className="w-full aspect-w-16 aspect-h-9 cursor-pointer">
                        <img src={animalOne?.photo} className="w-full" />
                        <h4 className="font-medium text-lg mt-3 text-center text-red-600">{animalOne?.name}</h4>
                    </a>
                    <div className="w-1/3 flex items-center justify-center font-semibold">OR</div>
                    <a onClick={e => selectBestAnimal(animalTwo, animalOne)} className="w-full aspect-w-16 aspect-h-9 cursor-pointer" >
                        <img src={animalTwo?.photo} className="w-full" />
                        <h4 className="font-medium text-lg mt-3 text-center text-red-600">{animalTwo?.name}</h4>
                    </a>
                </div>
            </div>
        </main>
    )
}

export default Home
