import './App.css';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from './img/waifuClubLogo.svg';
import Games from './Games';
import GlobeGame from './GlobeGame';

const root = "/" //deploy = / else waifuclub-website/

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={root} element={<Header />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="games" element={<Games />}/>
          <Route path="games/globeGame" element={<GlobeGame />}/>
        </Route>
      </Routes>
    </div>
  );
}

function Header() {
  let derniere_position_de_scroll_connue = 0;
  let ticking = false;

  const [isBlack, setIsBlack] = useState("");
  function faireQuelqueChose(position_scroll) {
    if (position_scroll === 0) {
      setIsBlack("")
    } else {
      if (isBlack === "") {
        setIsBlack(" header-black")
      }
    }
  }

  window.addEventListener('scroll', function(e) {
    derniere_position_de_scroll_connue = window.scrollY;
  
    if (!ticking) {
      window.requestAnimationFrame(function() {
        faireQuelqueChose(derniere_position_de_scroll_connue);
        ticking = false;
      });
    }
  
    ticking = true;
  });

  return(
    <div>
      <nav>
        <div className={"header" + isBlack}>
          <div className="header-contents">
            <Link to="">
              <Logo className="Logo" >
                <a href='' />
              </Logo>
            </Link>
            <div className="navigation">
              <ul>
                <li>
                  <Link to="">Home</Link>
                </li>
                <li>
                  <Link to="games">Games</Link>
                </li>
              </ul>
            </div>
            <div className='antiLogo'>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

// App.js
function Home() {
  useEffect(()=>{
    document.title = "Home / Waifu Club"
    console.log(document.scrollTop)
  }, [])
  
  return (
    <div>
      <div className="db1">
      </div>
      <div className="db1">
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <div className='db1 bg-image'>
      <div className='flex-vertical justify-content-center'>
        <div className='conteneur'>
          <h1>404</h1>
          <h2>Not Found</h2>
          <p>
            <Link to="">Go to the home page</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
