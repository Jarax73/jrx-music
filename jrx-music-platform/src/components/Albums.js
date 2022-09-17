import { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Albums({
    id,
    token,
    artistsAlbums,
    getArtistsAlbums,
    setId,
    logout,
}) {
    Albums.propTypes = {
        id: PropTypes.string,
        token: PropTypes.string,
        setId: PropTypes.func,
        artistsAlbums: PropTypes.array,
        getArtistsAlbums: PropTypes.func,
        logout: PropTypes.func,
    };

    useEffect(() => {
        axios
            .get(`https://api.spotify.com/v1/artists/${id}/albums`, {
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
    }, []);

    return (
        <div className="section">
            {<h2 style={{ marginLeft: '5%', marginTop: '10%' }}></h2>}
            <div className="render-artists">
                {artistsAlbums == [] ? (
                    <div>Nothing yet ...</div>
                ) : (
                    artistsAlbums.map((artistsAlbum) => (
                        <Link
                            to="/Tracks"
                            key={artistsAlbum.id}
                            className="artist"
                            onClick={() => setId(artistsAlbum.id)}
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
