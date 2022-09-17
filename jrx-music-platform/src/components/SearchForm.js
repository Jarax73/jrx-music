import PropTypes from 'prop-types';
import { RiSearch2Line } from 'react-icons/ri';
import axios from 'axios';
import React, { useState } from 'react';
import SearchArtists from './SearchArtists';

export default function SearchForm({
    token,
    setUrl,
    play,
    playerDevice,
    logout,
}) {
    SearchForm.propTypes = {
        token: PropTypes.string,
        playerDevice: PropTypes.object,
        play: PropTypes.func,
        setUrl: PropTypes.func,
        logout: PropTypes.func,
    };
    const [searchKey, setSearchKey] = useState('');
    const [artists, setArtists] = useState([]);

    const searchArtists = async (e) => {
        e.preventDefault();

        const { data } = await axios
            .get('https://api.spotify.com/v1/search', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    q: searchKey,
                    type: 'artist',
                },
            })
            .catch((error) =>
                error.message === 'The access token expired' ? logout() : null
            );
        setArtists(data.artists.items);
    };

    return (
        <React.Fragment>
            <div className="row">
                <form className="search" onSubmit={searchArtists}>
                    <button className="searchArtists" type="submit">
                        <input
                            type="text"
                            placeholder="Artists"
                            onChange={(e) => setSearchKey(e.target.value)}
                        />
                        <RiSearch2Line style={{ color: 'white' }} />
                    </button>
                </form>
            </div>
            <SearchArtists
                setUrl={setUrl}
                artists={artists}
                play={play}
                playerDevice={playerDevice}
            />
        </React.Fragment>
    );
}
