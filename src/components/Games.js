import './App.css';
import './Games.css';
import React, {useState} from 'react';
import {countries} from "./data/countries.js";
import MapChart from "./MapChart";

let paysTrouves = []
let regions = {'Americas':[], 'Asia':[], 'Africa':[], 'Europe':[], 'Oceania':[], 'Antarctic':[] }

export default function Games() {
    const [value, setValue] = useState("");
    const [envoie, setEnvoie] = useState("");

    let handleChange = (event) => {
        let entree = event.target.value
        let entree_norm = entree.normalize("NFD").replace(new RegExp("[^(a-zA-Z)]", "g"), '').toUpperCase()
        for (let i = 0; i < countries.length; i++) {
            const element = countries[i];
            const countrie_name = element.name.common;
            const countrie_name_fr = element.translations.fra.common;
            if (countrie_name_fr.normalize("NFD").replace(new RegExp("[^(a-zA-Z)]", "g"), '').toUpperCase() === entree_norm) {
                if(!paysTrouves.includes(countrie_name_fr)){
                    paysTrouves.push(countrie_name_fr);
                    setEnvoie(element.cca3);
                    setValue("");
                    console.log()
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
            <MapChart inputValue={envoie} />
        </div>
    );
}
