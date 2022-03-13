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
    const [fini, setFini] = useState(false);

    const [reset, setReset] = useState(false);

    let randomReset = () => {
        setRandomCountrie(countries[Math.floor(Math.random() * countries.length)])
        setValue("")
        setEnvoie([])
        setPaysTrouves([])
        setFini(false)
        setReset(!reset)
    }

    let handleChange = (event) => {
        let entree = event.target.value
        let entree_norm = entree.normalize("NFD").replace(new RegExp("[^(a-zA-Z)]", "g"), '').toUpperCase()
        for (let i = 0; i < countries.length; i++) {
            const element = countries[i];
            const countrie_name_fr = element.translations.fra.common;
            if (countrie_name_fr.normalize("NFD").replace(new RegExp("[^(a-zA-Z)]", "g"), '').toUpperCase() === entree_norm) {
                if(!paysTrouves.includes(countrie_name_fr)){
                    const dist = Math.abs(Math.round(randomCountrie.latlng[0] - element.latlng[0] + randomCountrie.latlng[1] - element.latlng[1]))
                    const coo = element.latlng
                    //console.log(randomCountrie.translations.fra.common)
                    setPaysTrouves([...paysTrouves, countrie_name_fr])
                    setEnvoie([element.cca2, dist, coo]);
                    setValue("");
                    if(dist === 0){
                        setFini(true)
                    }
                } else {
                    setValue(entree);
                }
                return
            }
        }
        setValue(entree);
    }

    if(fini){
        return (
            <div className='centered-element'>
                <div className='centered-element'>
                    <p className='centered-element'>Pays Trouvé : {randomCountrie.translations.fra.common}</p>
                    <input className='centered-element' type="button" value="Rejouer ?" onClick={(e) => randomReset()} />
                </div>
                <GlobeGame inputCountrie={envoie} />
            </div>
        );
    }else {
        return (
            <div className='centered-element'>
                <input className='searchPays centered-element' type="search" value={value} onChange={(event) => handleChange(event)} />
                <GlobeGame inputCountrie={envoie} reset={reset}/>
            </div>
        );
    }
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