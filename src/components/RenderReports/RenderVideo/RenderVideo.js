import React from 'react';
import {
	Player,
	ControlBar,
	ReplayControl,
	ForwardControl,
	CurrentTimeDisplay,
	TimeDivider,
	PlaybackRateMenuButton,
	VolumeMenuButton,
	BigPlayButton,
} from 'video-react';
import 'video-react/dist/video-react.css'; // import css
import 'video-react/styles/scss/video-react.scss'; // or import scss
import './RenderVideo.css'

const RenderVideo=(props)=>{
        return<>
        <div className="video-player">
            <Player 
        playsInline 
        poster=""
        fluid={false}
        width={580}
        height={400}
        src={props.report.media} >
        <BigPlayButton position="center" />
        <ControlBar autoHide={false}>
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={30} order={1.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
            <VolumeMenuButton disabled />
        </ControlBar>
    </Player>
    </div> </>
}
export default RenderVideo;