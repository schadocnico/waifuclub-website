import './App.css';
import './Games.css';
import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const GlobeGame = (props) => {
    const globeEl = useRef();
    const [countries, setCountries] = useState({ features: []});
    const [countriesInput, setCountriesInput] = useState([]);
    const [countriesColorInput, setCountriesColorInput] = useState({});

    useEffect(() => {
      // load data
      fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson').then(res => res.json())
        .then(countries=> {
            //console.log(countries)
            setCountries(countries);
        });
    }, []);

    useEffect(() => {
        if(props.inputCountrie[0]){
            setCountriesInput([...countriesInput, props.inputCountrie[0]])
            setCountriesColorInput({...countriesColorInput, [props.inputCountrie[0]]: props.inputCountrie[1]})
            console.log(countriesColorInput)
        }
    }, [props.inputCountrie]);

    return (
        <div>
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                width = {600}
                height = {600}
                polygonsData={countries.features.filter(d => countriesInput.includes(d.properties.ADM0_A3))}
                polygonAltitude={0.01}
                polygonCapColor={(p) => 'rgba(' + Math.abs(countriesColorInput[p.properties.ADM0_A3]*0.95-255) + ', 0, 0, 0.8)'}
                polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
            />
        </div>
    );
};

export default GlobeGame;
