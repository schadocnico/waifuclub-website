import './Racing.css';
import React, {useEffect, memo} from 'react';
import ReactPlayer from 'react-player';
import Mx5Video from './img/mx5-video.mp4';

function Racing(props) {
    useEffect(()=>{
      document.title = "Racing Team / Waifu Club"
    }, [])
    
    return (
        <>
            <div className='video-container' style={{paddingTop:'0px'}}>
                <ReactPlayer
                    className='racing-main-video'
                    url={Mx5Video}
                    playsInline={true}
                    playing={true}
                    loop={true}
                    muted
                    disablePlayPause={true}
                    width="auto"
                    height="auto"
                />
            </div>
            <div className='racing-bandeau'>
            </div>
        </>
    );
}

export default memo(Racing);