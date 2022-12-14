import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';

export default function Library({ logout }) {
    Library.propTypes = {
        logout: PropTypes.func,
    };
    const [albums, setAlbums] = useState('');
    const [topArtists, setTopArtists] = useState([]);
    const token = useContext(AppContext);

    useEffect(() => {
        axios
            .get('https://api.spotify.com/v1/browse/new-releases', {
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => setAlbums(response.data.albums.items))
            .catch((error) =>
                error.message === 'The access token expired' ? logout() : null
            );

        axios
            .get('https://api.spotify.com/v1/me/top/artists', {
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => setTopArtists(response.data.items))
            .catch((error) =>
                error.message === 'The access token expired' ? logout() : null
            );
    }, []);

    return (
        <div className="section">
            <h2 style={{ marginLeft: '5%', marginTop: '10%' }}>
                Your Top Artists
            </h2>
            <div className="render-artists">
                {!topArtists ? (
                    <div
                        style={{
                            margin: '20% auto',
                        }}
                    >
                        Nothing yet ...
                    </div>
                ) : (
                    topArtists.map((topArtist) => (
                        <Link
                            to={`/Albums/${topArtist.id}`}
                            key={topArtist.id}
                            className="artist"
                        >
                            {topArtist.images.length === 0 ? (
                                <img alt="No image" />
                            ) : (
                                <img
                                    src={topArtist.images[0].url}
                                    alt={topArtist.name}
                                />
                            )}
                            <div className="artist-detail">
                                <div>{topArtist.name}</div>
                                <div className="artist-played">
                                    <div>
                                        {topArtist.followers.total} followers
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
            <h2 style={{ marginLeft: '5%', marginTop: '10%' }}>New releases</h2>
            <div className="render-artists">
                {!albums ? (
                    <div
                        style={{
                            margin: '20% auto',
                        }}
                    >
                        Nothing yet ...
                    </div>
                ) : (
                    albums.map((album) => (
                        <Link
                            to={`/Tracks/${album.id}`}
                            key={album.id}
                            className="artist"
                        >
                            {album.images.length ? (
                                <img
                                    src={album.images[0].url}
                                    alt={album.name}
                                />
                            ) : (
                                <img src={album.images[0].url} alt="No image" />
                            )}
                            <div className="artist-played">
                                <div className="artist-detail">
                                    {album.name}
                                    <br />
                                    {album.artists[0].name}
                                    <div>{album.total_tracks} songs</div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
