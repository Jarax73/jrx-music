import React from 'react';
import RecentlyPlayed from './RecentlyPlayed';
import PropTypes from 'prop-types';

export default function Home({ token, setUrl, play, playerDevice, logout }) {
    Home.propTypes = {
        token: PropTypes.string,
        playerDevice: PropTypes.object,
        setUrl: PropTypes.func,
        play: PropTypes.func,
        logout: PropTypes.func,
    };
    return (
        <RecentlyPlayed
            token={token}
            setUrl={setUrl}
            play={play}
            playerDevice={playerDevice}
            logout={logout}
        />
    );
}
