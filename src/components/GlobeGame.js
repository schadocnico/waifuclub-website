import './App.css';
import './Games.css';
import React, { memo, useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { scaleSequentialSqrt } from "d3-scale";
import {
    interpolateBuPu,
    interpolateOrRd,
    interpolateGreys,
  } from "d3-scale-chromatic";
import data from './data/countries_data.json'
import {countries} from "./data/countries.js";

function GlobeGame() {
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
            <div className='centered-element bg-image db1'>
                <div className='centered-element'>
                    <p className='centered-element'>Pays Trouvé : {randomCountrie.translations.fra.common}</p>
                    <input className='centered-element' type="button" value="Rejouer ?" onClick={(e) => randomReset()} />
                </div>
                <GlobeView inputCountrie={envoie} />
            </div>
        );
    }else {
        return (
            <div className='centered-element bg-image db1'>
                <div className='centered-element' style={{paddingTop: '25px'}}>
                    <input className='searchPays centered-element' type="search" value={value} onChange={(event) => handleChange(event)} />
                    <GlobeView inputCountrie={envoie} reset={reset}/>
                </div>
            </div>
        );
    }
}

const GlobeView = (props) => {
    const globeEl = useRef();
    const [countries, setCountries] = useState({ features: []});
    const [countriesInput, setCountriesInput] = useState([]);
    const [countriesColorInput, setCountriesColorInput] = useState({});

    useEffect(() => {
        setCountriesInput([])
        setCountriesColorInput({})
    }, [props.reset])

    useEffect(() => {
        // load data
        //console.log(data)
        setCountries(data);
        const lat = 0;
        const lng = 0;
        const alt = 1;
        globeEl.current.pointOfView({ lat: 15, lng: 10, altitude: 1.5 })
    }, []);

    useEffect(() => {
        if(props.inputCountrie[0]){
            setCountriesInput([...countriesInput, props.inputCountrie[0]])
            setCountriesColorInput({...countriesColorInput, [props.inputCountrie[0]]: props.inputCountrie[1]})
            const lat = props.inputCountrie[2][0];
            const lng = props.inputCountrie[2][1];
            globeEl.current.pointOfView({ lat, lng }, 200)
        }
    }, [props.inputCountrie]);

    /*useEffect(() => {
        console.log(countriesColorInput)
    }, [countriesColorInput])*/

    return (
        <div>
            <Globe
                className="centered-element"
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                showAtmosphere = {false}
                width = {700}
                height = {700}
                backgroundColor = {"rgba(0, 0, 0, 0)"}
                polygonsData={countries.features.filter(d => countriesInput.includes(d.properties.ISO_A2_EH))}
                polygonAltitude={0.01}
                toGlobeCoords = {[90, -90]}
                polygonCapColor={(p) => {
                    const colorScale = scaleSequentialSqrt(interpolateOrRd).domain([360, 0]);
                    if(countriesColorInput[p.properties.ISO_A2_EH] === 0){
                        return 'rgb(0, 0, 255)'
                    }
                    return colorScale(countriesColorInput[p.properties.ISO_A2_EH]);
                }}
                polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
            />
        </div>
    );
};

export default memo(GlobeGame);
