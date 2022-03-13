import './App.css';
import './Games.css';
import React, {useState, useEffect} from 'react';
import {countries} from "./data/countries.js";
import MapChart from "./MapChart";
import GlobeGame from "./GlobeGame";

//let regions = {'Americas':[], 'Asia':[], 'Africa':[], 'Europe':[], 'Oceania':[], 'Antarctic':[] }

export default function Games() {
    const [value, setValue] = useState("");
    const [envoie, setEnvoie] = useState([]);
    const [paysTrouves, setPaysTrouves] = useState([]);
    const [randomCountrie, setRandomCountrie] = useState(countries[Math.floor(Math.random() * countries.length)]);


    let handleChange = (event) => {
        let entree = event.target.value
        let entree_norm = entree.normalize("NFD").replace(new RegExp("[^(a-zA-Z)]", "g"), '').toUpperCase()
        for (let i = 0; i < countries.length; i++) {
            const element = countries[i];
            const countrie_name_fr = element.translations.fra.common;
            if (countrie_name_fr.normalize("NFD").replace(new RegExp("[^(a-zA-Z)]", "g"), '').toUpperCase() === entree_norm) {
                if(!paysTrouves.includes(countrie_name_fr)){
                    const dist = Math.abs(Math.round(randomCountrie.latlng[0] - element.latlng[0] + randomCountrie.latlng[1] - element.latlng[1]))
                    setPaysTrouves([...paysTrouves, countrie_name_fr])
                    setEnvoie([element.cca3, dist]);
                    setValue("");
                } else {
                    setValue(entree);
                }
                return
            }
        }
        setValue(entree);
    }

    return (
        <div>
            <input className='searchPays' type="search" value={value} onChange={(event) => handleChange(event)} />
            <GlobeGame inputCountrie={envoie} />
        </div>
    );
}

function continent() {
    <table>
        <thead>
            <tr>
                <th>Americas</th>
                <th>Asia</th>
                <th>Africa</th>
                <th>Europe</th>
                <th>Oceania</th>
                <th>Antarctic</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>The table body</td>
                <td>with two columns</td>
            </tr>
        </tbody>
    </table>
}