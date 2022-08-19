import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk';
import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import axios from 'axios';

const Player = ({ token }) => {
    const [url, setUrl] = useState('');
    // const url = 'spotify:artist:5pKCCKE2ajJHZ9KAiaK11H';
    const [play, setPlay] = useState(false);

    const initialVolume = 20;

    const searchTracks = async () => {
        const { data } = await axios.get(
            'https://api.spotify.com/v1/me/player/recently-played?',
            {
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(data.items[0].track);
        // setUrl(data.items[0].track.uri);
        setUrl(data.items.map((item) => item.track));
    };
    console.log(url);
    useEffect(() => {
        setPlay(true);
        // searchTracks();
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
                uris={url ? url : []}
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
