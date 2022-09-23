import RecentlyPlayed from './RecentlyPlayed';
import PropTypes from 'prop-types';

export default function Home({ setUrl, play, playerDevice, logout }) {
    Home.propTypes = {
        playerDevice: PropTypes.object,
        setUrl: PropTypes.func,
        play: PropTypes.func,
        logout: PropTypes.func,
    };
    return (
        <RecentlyPlayed
            setUrl={setUrl}
            play={play}
            playerDevice={playerDevice}
            logout={logout}
        />
    );
}
