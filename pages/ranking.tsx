import type {NextPage} from 'next'
import Link from 'next/link';
import {useEffect, useState} from "react";

const Ranking: NextPage = () => {
    var i = 0

    function showReply(id: string, reply: string | null, image: File){
        let container = document.getElementById(id);
        let p = document.createElement('p');
        let f = document.createElement('img')
        p.textContent = reply;
        f.src = image;
        container.appendChild(p);
        container.appendChild(f);
      }

    const getAnimals = async () => {
        const res = await fetch('/api/animals', {
            method: 'GET'
        })
        const data = await res.json();
        // randomize animals
        const shuffled = data.animals.sort(function (a: { score: number; }, b: { score: number; }) {
            return b.score - a.score;
        })

        for (let index = 0; index < shuffled.length; index++) {
            if(shuffled[index].name === shuffled[0].name){
                i++
                if(i == 0){ // it seems to me nonsense
                    break
                }
            }
            showReply("georgia", (index+1+ ": " + shuffled[index].name + " score: " ) + Math.round(shuffled[index].score), shuffled[index].photo)
            }   
            //console.log(shuffled.length);  

    
    };
    getAnimals()

    return(
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
        <div id="georgia">
            
        </div>
        </main>
    )}
export default Ranking
