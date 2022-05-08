import './App.css';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from './img/waifuClubLogo.svg';
import Games from './games/Games';
import GlobeGame from './games/GlobeGame';
import Home from './home/Home';
import Racing from './racing/Racing';

const root = "/" //deploy = / else waifuclub-website/

export default function App() {
  
  let derniere_position_de_scroll_connue = 0
  //let avant_derniere = 0
  let ticking = false;

  const [lastPos, setLastPos] = useState(0)
  useEffect(() => {
    window.onscroll = function(e) {
      //console.log(e)
      derniere_position_de_scroll_connue = window.scrollY;
    
      if (!ticking) {
        window.requestAnimationFrame(function() {
          setLastPos(derniere_position_de_scroll_connue)
          ticking = false;
        });
      }
    
      ticking = true;
    };
  }, [])


  return (
    <div className="App">
      <Routes>
        <Route path={root} element={<Header scrollPx={lastPos}/>}>
          <Route index element={<Home scrollPx={lastPos}/>} />
          <Route path="*" element={<NoMatch />} />
          <Route path="games" element={<Games />}/>
          <Route path="racing" element={<Racing />}/>
          <Route path="games/globeGame" element={<GlobeGame />}/>
        </Route>
      </Routes>
    </div>
  );
}

function Header(props) {
  const [isBlack, setIsBlack] = useState("");
  useEffect(() => {
    faireQuelqueChose(props.scrollPx)
  }, [props.scrollPx])

  function faireQuelqueChose(position_scroll) {
    if (position_scroll === 0) {
      setIsBlack("")
    } else {
      if (isBlack === "") {
        setIsBlack(" header-black")
      }
    }
  }

  return(
    <div className='container'>
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
                  <Link to="racing">Racing</Link>
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
      <div className='main-container'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <div className='footer-container'>

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
