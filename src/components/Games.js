import './App.css';
import './Games.css';
import React, {useEffect, memo} from 'react';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import globeGameHeaderLogo from './img/games/globegame-header.jpg';

//let regions = {'Americas':[], 'Asia':[], 'Africa':[], 'Europe':[], 'Oceania':[], 'Antarctic':[] }

function Games() {
    useEffect(()=>{
        document.title = "Games / Waifu Club"
    }, [])

    return(
        <div className='db1 bg-image'>
            <div className='games-container'>
                <div className='games'>
                    <GlobeGame />
                </div>
            </div>
        </div>
    );
}

function GlobeGame() {
    return(
        <Link to="globeGame">
            <div className='container-game shadow'>
                <div className='game-image'>
                    <img className='image-game-image' src={globeGameHeaderLogo}/>
                </div>
            </div>
        </Link>
    );
}

export default memo(Games);