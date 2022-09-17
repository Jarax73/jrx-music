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
    // const clientID = 'af6fe4b7a75e4651bd1531de3f541e53';
    const clientID = '9fd3ef26a5114097853bbdc04f47845e';
    const redirectUrl = 'http://localhost:3000/';
    // const redirectUrl = 'https://jrx-music-platform.vercel.app/';
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
    const [totalPlaylistTracks, setTotalPlaylistTracks] = useState('');
    const [id, setId] = useState('');
    const [artistsAlbums, getArtistsAlbums] = useState([]);

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
                                            logout={logout}
                                        />
                                    }
                                />
                                <Route
                                    exact
                                    path="/"
                                    element={
                                        <Home
                                            token={token}
                                            logout={logout}
                                            profile={profile}
                                            setUrl={setUrl}
                                            url={url}
                                        />
                                    }
                                />
                                <Route
                                    path="/Library"
                                    element={
                                        <Library
                                            token={token}
                                            setUrl={setUrl}
                                            setId={setId}
                                            logout={logout}
                                        />
                                    }
                                />
                                <Route
                                    path="/Playlists"
                                    element={
                                        <Playlists
                                            token={token}
                                            setUrl={setUrl}
                                            setTotalPlaylistTracks={
                                                setTotalPlaylistTracks
                                            }
                                            logout={logout}
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
                                            logout={logout}
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
                                            artistsAlbums={artistsAlbums}
                                            logout={logout}
                                        />
                                    }
                                />
                                <Route path="*" element={<Error />} />
                            </Routes>
                        </div>
                        <Player token={token} url={url} />
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
