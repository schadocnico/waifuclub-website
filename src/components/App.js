import './App.css';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from './img/waifuClubLogo.svg';
import paco from './img/dynamique/parco1.png'
import Games from './Games';
import GlobeGame from './GlobeGame';

const root = "/" //deploy = / else waifuclub-website/

export default function App() {
  
  let derniere_position_de_scroll_connue = 0
  //let avant_derniere = 0
  let ticking = false;

  const [lastPos, setLastPos] = useState(0)
  useEffect(() => {
    window.document.getElementsByClassName('content')[0].addEventListener('scroll', function(e) {
      //avant_derniere = derniere_position_de_scroll_connue;
      derniere_position_de_scroll_connue = window.document.getElementsByClassName('content')[0].scrollTop;
      //console.log(derniere_position_de_scroll_connue)
    
      if (!ticking) {
        window.requestAnimationFrame(function() {
          setLastPos(derniere_position_de_scroll_connue)
          ticking = false;
        });
      }
    
      ticking = true;
    })
  }, [])


  return (
    <div className="App">
      <Routes>
        <Route path={root} element={<Header scrollPx={lastPos}/>}>
          <Route index element={<Home scrollPx={lastPos}/>} />
          <Route path="*" element={<NoMatch />} />
          <Route path="games" element={<Games />}/>
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
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
}

// App.js
function Home(props) {
  useEffect(()=>{
    document.title = "Home / Waifu Club"
  }, [])

  const [heightParcho, setHeightParcho] = useState(80)
  const [displayParcho, setDisplayParcho] = useState('inherit')
  const [topParcho, setTopParcho] = useState('')
  useEffect(() => {
    if (props.scrollPx > window.innerHeight-83 && props.scrollPx < 2*window.innerHeight) {
      if(displayParcho === 'inherit'){
        setDisplayParcho('fixed')
      }
      if (topParcho === 'after-parcho') {
        setTopParcho('')
      }
      let b = 80;
      let a = (500-b)/(2*window.innerHeight-window.innerHeight-83)
      let x = window.innerHeight-83 - props.scrollPx
      setHeightParcho(Math.min(-a*x+b, 500))
    } else{
      if (displayParcho === 'fixed') {
        setDisplayParcho('inherit')
      }
      if (props.scrollPx > 2*window.innerHeight) {
        setTopParcho('after-parcho')
      }else{
        setTopParcho('')
      }
    }
  }, [props.scrollPx])
  
  return (
      <div className='content-in'>
        <div className="db1 vh home1">
        </div>
        <div className="vh-header home2">
          <div style={{position: 'center'}}>
            <div className={displayParcho+'-parcho '+topParcho} style={{height:heightParcho+'px'}}>
                <img src={paco} alt="paco" className='parcho' style={{}}></img>
            </div>
          </div>
          
        </div>
        <div className="vh-header" style={{backgroundColor: "black"}}>
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
