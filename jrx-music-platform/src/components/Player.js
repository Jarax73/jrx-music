import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ token, url }) => {
    const [play, setPlay] = useState(false);
    const initialVolume = 30;
    
    console.log(url);
    useEffect(() => {
        setPlay(true);
    }, [url]);

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
                    bgColor: '#2679a7',
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
