/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from './components/Header';
import Player from './components/Player';
import Home from './components/Home';
import Library from './components/Library';
import Playlists from './components/Playlists';
import Albums from './components/Albums';
import Tracks from './components/Tracks';
import Login from './components/Login';
import Aside from './components/Aside';
import Error from './Error';
import { Routes, Route } from 'react-router-dom';
import SearchForm from './components/SearchForm';

export default function App() {
    const clientID = 'af6fe4b7a75e4651bd1531de3f541e53';
    const redirectUrl = 'https://jrx-music-platform.vercel.app/';
    const apiUrl = 'https://accounts.spotify.com/authorize';
    const responseType = 'token';
    const scope = [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-modify-playback-state',
        'user-read-playback-state',
        'user-read-currently-playing',
        'user-read-recently-played',
        'user-read-playback-position',
        'user-top-read',
        'user-library-read',
        'user-library-modify',
    ];
    const [token, setToken] = useState('');
    const [profile, setProfile] = useState({});
    const [url, setUrl] = useState('');
    const [totalPlaylistTracks, setTotalPlaylistTracks] = useState(0);
    const [id, setId] = useState('');
    const [artistsAlbums, getArtistsAlbums] = useState([]);
    const [playerDevice, setPlayerDevice] = useState({});

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem('token');

        if (!token && hash) {
            token = hash
                .substring(1)
                .split('&')
                .find((elem) => elem.startsWith('access_token'))
                .split('=')[1];
            window.location.hash = '';
            window.localStorage.setItem('token', token);
        }
        setToken(token);

        axios
            .get('https://api.spotify.com/v1/me/player/devices', {
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => setPlayerDevice(response.data))
            .catch((error) =>
                error.message === 'The access token expired' ? logout() : null
            );

        axios
            .get('https://api.spotify.com/v1/me', {
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => setProfile(response.data))
            .catch((error) =>
                error.message === 'The access token expired' ? logout() : null
            );
    }, []);

    const handleClick = () => {
        window.location.href = `${apiUrl}?client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scope.join(
            '%20'
        )}&response_type=${responseType}&show_dialog=true`;
    };

    const logout = () => {
        setToken(null);
        window.localStorage.removeItem('token');
    };

    function play(url, playerDevice) {
        if (playerDevice === {}) {
            if (Array.isArray(playerDevice.devices)) {
                playerDevice.devices.map((player) => {
                    fetch(
                        `https://api.spotify.com/v1/me/player/play?device_id=${player.id}`,
                        {
                            method: 'PUT',
                            body: JSON.stringify({
                                uris: [url],
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                });
            }
        } else {
            setUrl(url, playerDevice === undefined);
        }
    }

    return (
        <div className="container">
            {!token ? (
                <Login handleClick={handleClick} />
            ) : (
                <React.Fragment>
                    <Menu logout={logout} profile={profile} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="section">
                            <Routes>
                                <Route
                                    path="/search"
                                    element={
                                        <SearchForm
                                            token={token}
                                            setUrl={setUrl}
                                            play={play}
                                            playerDevice={playerDevice}
                                        />
                                    }
                                />
                                <Route
                                    exact
                                    path="/"
                                    element={
                                        <Home
                                            token={token}
                                            setUrl={setUrl}
                                            playerDevice={playerDevice}
                                            play={play}
                                        />
                                    }
                                />
                                <Route
                                    path="/Library"
                                    element={
                                        <Library
                                            token={token}
                                            setUrl={setUrl}
                                            play={play}
                                            playerDevice={playerDevice}
                                            setId={setId}
                                        />
                                    }
                                />
                                <Route
                                    path="/Playlists"
                                    element={
                                        <Playlists
                                            token={token}
                                            setUrl={setUrl}
                                            play={play}
                                            playerDevice={playerDevice}
                                            setTotalPlaylistTracks={
                                                setTotalPlaylistTracks
                                            }
                                        />
                                    }
                                />
                                <Route
                                    path="/Albums"
                                    element={
                                        <Albums
                                            token={token}
                                            id={id}
                                            setId={setId}
                                            artistsAlbums={artistsAlbums}
                                            getArtistsAlbums={getArtistsAlbums}
                                        />
                                    }
                                />
                                <Route
                                    path="/Tracks"
                                    element={
                                        <Tracks
                                            token={token}
                                            id={id}
                                            setUrl={setUrl}
                                            play={play}
                                            playerDevice={playerDevice}
                                            artistsAlbums={artistsAlbums}
                                        />
                                    }
                                />
                                <Route path="*" element={<Error />} />
                            </Routes>
                        </div>
                        <Player
                            token={token}
                            url={url}
                            playerDevice={playerDevice}
                        />
                    </div>
                    <Aside
                        totalPlaylistTracks={totalPlaylistTracks}
                        profile={profile}
                        logout={logout}
                    />
                </React.Fragment>
            )}
        </div>
    );
}
