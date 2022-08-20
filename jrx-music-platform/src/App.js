import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Menu from './components/Header';
import Player from './components/Player';
import Aside from './components/Aside';
import Home from './components/Home';
import Playlists from './components/Playlists';
import Library from './components/Library';
import SearchArtists from './components/SearchArtists';
import { Routes, Route } from 'react-router-dom';

export default function App() {
    const clientID = 'af6fe4b7a75e4651bd1531de3f541e53';
    const redirectUrl = 'http://localhost:3000';
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
    const [recent, setRecent] = useState('');
    const [url, setUrl] = useState([]);

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

            console.log(localStorage);
        }
        setToken(token);
        console.log(recent);

        window.onload = axios
            .get(
                'https://api.spotify.com/v1/me/player/recently-played?limit=6',
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => setRecent(response.data.items));
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

    // console.log(response.items[0].track);
    console.log(recent);
    // setRecent(response.items.map((item) => item.track));

    const renderRecentPlayed = () => {
        return recent ? (
            recent
                .filter(function (ele, pos) {
                    return recent.indexOf(ele) === pos;
                })
                .map((item) => (
                    <div
                        className="artist"
                        key={item.track.id}
                        onClick={() => setUrl(item.track.uri)}
                        style={{
                            width: '20%',
                            position: 'relative',
                        }}
                    >
                        <div>
                            <img
                                src={item.track.album.images[0].url}
                                alt=""
                                style={{ height: '80%' }}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                //   flexDirection: 'column',
                                padding: '5px',
                            }}
                        >
                            <div>
                                <span style={{ color: 'white' }}>
                                    {item.track.artists[0].name} <br />
                                </span>
                                <span style={{ color: '#CFC5C5' }}>
                                    {item.track.name}
                                </span>
                            </div>
                            {/* <div
                              style={{
                                  alignSelf: 'flex-end',
                                  justifySelf: 'flex-end',
                              }}
                          >
                              <RiPlayCircleFill
                                  className="notify"
                                  onclick={() => setRecent(item.track.uri)}
                              />
                          </div> */}
                        </div>
                        {console.log(recent[0].track.album.images[0].url)}
                        {console.log(
                            recent.map((item) => item.track.album.images[0].url)
                        )}
                    </div>
                ))
        ) : (
            <p style={{ justifySelf: 'center', alignSelf: 'center' }}>
                Chargement
            </p>
        );
    };

    return (
        <div>
            {!token ? (
                <Login handleClick={handleClick} />
            ) : (
                <React.Fragment>
                    {/* <Menu /> */}
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/playlists" element={<Playlists />} />
                        <Route path="/library" element={<Library />} />
                    </Routes>
                </React.Fragment>
            )}
        </div>
    );
}
