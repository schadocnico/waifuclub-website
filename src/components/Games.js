import './App.css';
import './Games.css';
import React, {useState, memo} from 'react';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import globeGameHeaderLogo from './img/games/globegame-header.jpg';

//let regions = {'Americas':[], 'Asia':[], 'Africa':[], 'Europe':[], 'Oceania':[], 'Antarctic':[] }

function Games() {
    return(
        <div className='db1 bg-image'>
            <div className='games'>
                <Game />
            </div>
        </div>
    );
}

function Game() {
    return(
        <div className='container-game shadow'>
            <div className='game-image'>
                <img className='image-game-image' src={globeGameHeaderLogo}>
                </img>
            </div>
            <h3 style={{textAlign: "center"}}>
                Globe Game
            </h3>
            <div className='game-play'>
                <Link to="globeGame">
                    <input type="button" value="PLAY" loading="eager"/>
                </Link>
            </div>
        </div>
    );
}

export default memo(Games);