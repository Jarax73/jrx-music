import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ token, url }) => {
    Player.propTypes = {
        token: PropTypes.string,
        url: PropTypes.string,
    };
    const [play, setPlay] = useState(false);
    const initialVolume = 30;

    useEffect(() => {
        setPlay(true);
    }, [url]);
    console.log(url);
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
                    bgColor: '#74AECE',
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
