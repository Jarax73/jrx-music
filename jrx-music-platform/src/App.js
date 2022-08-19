import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Menu from './components/Menu';
import Player from './components/Player';
import Aside from './components/Aside';
import { RiSearch2Line } from 'react-icons/ri';
import { RiPlayCircleFill } from 'react-icons/ri';

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
    const [searchKey, setSearchKey] = useState('');
    const [artists, setArtists] = useState('');
    const [url, setUrl] = useState('');

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
        console.log(url);

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
            .then((response) => setUrl(response.data.items));
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
    // setUrl(data.items[0].track.uri);
    // setUrl(response.items.map((item) => item.track));

    const searchArtists = async (e) => {
        e.preventDefault();

        const { data } = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: searchKey,
                type: 'artist',
            },
        });

        setArtists(data.artists.items);
        console.log(data.artists.items);
    };
    console.log(artists);
    const renderArtists = () => {
        return artists === ''
            ? null
            : artists.map((artist) => (
                  <div className="artist" key={artist.id}>
                      {artist.images.length ? (
                          <img
                              width={'100%'}
                              height={'100%'}
                              src={artist.images[0].url}
                              alt=""
                          />
                      ) : (
                          <div>No image</div>
                      )}
                      <div className="artist-detail">
                          {artist.name}
                          <br />
                          {artist.genres[0]}
                      </div>
                  </div>
              ));
    };
    const renderRecentPlayed = () => {
        return url ? (
            url
                .filter(function (ele, pos) {
                    return url.indexOf(ele) === pos;
                })
                .map((item) => (
                    <div
                        className="artist"
                        key={item.track.id}
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
                                  onclick={() => setUrl(item.track.uri)}
                              />
                          </div> */}
                        </div>
                        {console.log(url[0].track.album.images[0].url)}
                        {console.log(
                            url.map((item) => item.track.album.images[0].url)
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
        <div className="container">
            {!token ? (
                <Login handleClick={handleClick} />
            ) : (
                <React.Fragment>
                    <Menu logout={logout} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="section">
                            <div className="row">
                                <form
                                    className="search"
                                    onSubmit={searchArtists}
                                >
                                    <button
                                        className="searchArtists"
                                        type="submit"
                                    >
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setSearchKey(e.target.value)
                                            }
                                        />
                                        <RiSearch2Line
                                            style={{ color: '#05476b' }}
                                        />
                                    </button>
                                </form>
                            </div>
                            <div className="render-artists">
                                {renderArtists()}
                                {renderRecentPlayed()}
                            </div>
                        </div>
                        <Player token={token} />
                    </div>
                    <Aside token={token} redirectUrl={redirectUrl} />
                </React.Fragment>
            )}
        </div>
    );
}
