import React from 'react';
import PropTypes from 'prop-types';

export default function Login({ handleClick }) {
    Login.propTypes = {
        handleClick: PropTypes.func,
    };
    return (
        <div className="home">
            <div
                className="title"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '5% auto',
                }}
            >
                <h1 style={{ width: '400px', color: '#000' }}>
                    Welcome to Jrx Music by
                </h1>
                <div>
                    <img
                        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
                        alt="spotify"
                    />
                </div>
            </div>
            <button
                style={{
                    border: 'none',
                    color: '#2679a7',
                    fontWeight: 'bold',
                    boxShadow: '0px 2px 20px #a9a9a9',
                }}
                onClick={handleClick}
            >
                Connect to Spotify
            </button>
            <h2 style={{ color: '#000' }}>Please login</h2>
        </div>
    );
}
