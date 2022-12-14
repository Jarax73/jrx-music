import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

export default function Albums({ artistsAlbums, getArtistsAlbums, logout }) {
    Albums.propTypes = {
        id: PropTypes.string,
        artistsAlbums: PropTypes.array,
        getArtistsAlbums: PropTypes.func,
        logout: PropTypes.func,
    };

    const [artist, setArtist] = useState([]);
    let { artistId } = useParams();
    const token = useContext(AppContext);

    useEffect(() => {
        axios
            .get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => getArtistsAlbums(response.data.items))
            .catch((error) =>
                error.message === 'The access token expired' ? logout() : null
            );
        axios
            .get(`https://api.spotify.com/v1/artists/${artistId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
            })
            .then((response) => setArtist(response.data));
    }, []);
    console.log(artistsAlbums);
    return (
        <div className="section">
            <h2>
                {artist.length === 0 ? (
                    <div style={{ margin: 'auto' }}></div>
                ) : (
                    <div style={{ width: '100%', marginLeft: '35px' }}>
                        {`${artist.name}'s albums`}
                    </div>
                )}
            </h2>
            <div className="render-artists">
                {artistsAlbums == [] ? (
                    <div>Nothing yet ...</div>
                ) : (
                    artistsAlbums.map((artistsAlbum) => (
                        <Link
                            to={`/Tracks/${artistsAlbum.id}`}
                            key={artistsAlbum.id}
                            className="artist"
                        >
                            {artistsAlbum.images.length === 0 ? (
                                <img alt="No image" />
                            ) : (
                                <img src={artistsAlbum.images[0].url} />
                            )}

                            <div className="artist-detail">
                                <div>{artistsAlbum.name}</div>
                                <div className="artist-played">
                                    {artistsAlbum.release_date}
                                </div>
                                <div>{artistsAlbum.total_tracks} songs</div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
