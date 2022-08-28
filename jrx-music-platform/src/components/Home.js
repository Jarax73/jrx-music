import React from 'react';
import RecentlyPlayed from './RecentlyPlayed';
import PropTypes from 'prop-types';

export default function Home({ token, setUrl }) {
    Home.propTypes = {
        token: PropTypes.string,
        setUrl: PropTypes.func,
    };
    return <RecentlyPlayed token={token} setUrl={setUrl} />;
}
