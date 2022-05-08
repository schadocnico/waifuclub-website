import './Home.css';
import React, {useEffect, memo} from 'react';

function Home(props) {
    useEffect(()=>{
      document.title = "Home / Waifu Club"
    }, [])
    
    return (
      <>
        <div className="first-container home1 vh">
        </div>
      </>
    );
}

export default memo(Home);
