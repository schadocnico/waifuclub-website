import './App.css';
import './Games.css';
import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { scaleSequentialSqrt } from "d3-scale";
import {
    interpolateBuPu,
    interpolateOrRd,
    interpolateGreys,
  } from "d3-scale-chromatic";

const GlobeGame = (props) => {
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
                backgroundColor = {"black"}
                polygonsData={countries.features.filter(d => countriesInput.includes(d.properties.ADM0_A3))}
                polygonAltitude={0.01}
                toGlobeCoords = {[90, -90]}
                polygonCapColor={(p) => {
                    const colorScale = scaleSequentialSqrt(interpolateOrRd).domain([360, 0]);
                    if(countriesColorInput[p.properties.ADM0_A3] === 0){
                        return 'rgb(0, 0, 255)'
                    }
                    return colorScale(countriesColorInput[p.properties.ADM0_A3]);
                }}
                polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
            />
        </div>
    );
};

export default GlobeGame;
