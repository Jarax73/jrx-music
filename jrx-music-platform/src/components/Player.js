import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk';
import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import axios from 'axios';

const Player = ({ token, url }) => {
    // const url = 'spotify:artist:5pKCCKE2ajJHZ9KAiaK11H';
    const [play, setPlay] = useState(true);
  // const url = "spotify:artist:5pKCCKE2ajJHZ9KAiaK11H"
    const initialVolume = 20;
    
    console.log(url);
    useEffect(() => {
        setPlay(true);
    }, []);

    if (!token) return null;
    return (
        <div className="player-container">
            <SpotifyPlayer
                token={token}
                showSaveIcon
                callback={(state) => !state.isPlaying && setPlay(false)}
                initialVolume={initialVolume}
                play={play}
                uris={url}
                styles={{
                    activeColor: '#fff',
                    bgColor: '#05476b',
                    color: '#fff',
                    loaderColor: '#fff',
                    sliderColor: '#515151',
                    trackArtistColor: '#CFC5C5',
                    trackNameColor: '#fff',
                }}
            />
        </div>
    );
};

export default Player;
