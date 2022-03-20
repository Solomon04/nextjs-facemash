import type {NextPage} from 'next'
import Link from 'next/link';
import {useEffect, useState} from "react";

const Home: NextPage = () => {
    const [animalOne, setAnimalOne] = useState<Animal|undefined>();
    const [animalTwo, setAnimalTwo] = useState<Animal|undefined>();

    const getAnimals = async () => {
        const res = await fetch('/api/animals', {
            method: 'GET'
        });

        const data = await res.json();
        // randomize animals
        const shuffled = data.animals.sort(() => 0.5 - Math.random());
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
            <div className="header">
                {/* Heading */}
                <Link href="/">
                    <a className="nav-heading">
                        DogMash 🐶
                    </a>
                </Link>

                <Link href="/ranking">
                    <a className="nav-text">
                        Rankings
                    </a>
                </Link>
            </div>
            <div className="container">
                <h2 className="subheading">
                    Who is Cuter? Click to Choose
                </h2>
                <div className="choice-container">
                    {/* AnimalCard */}
                    <div className="animal-card" onClick={e => selectBestAnimal(animalTwo, animalOne)}>
                        <img src={animalOne?.photo} />
                        <h4 className="animal-card-text">
                            {animalOne?.name}
                        </h4>
                    </div>
                    <div className="card-break">
                        OR
                    </div>
                    <div className="animal-card" onClick={e => selectBestAnimal(animalTwo, animalOne)}>
                        <img src={animalTwo?.photo} />
                        <h4 className="animal-card-text">
                            {animalTwo?.name}
                        </h4>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home
