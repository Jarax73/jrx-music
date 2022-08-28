import React from 'react';
import PropTypes from 'prop-types';
import { RiPlayCircleFill } from 'react-icons/ri';
// import { IoMusicalNotesSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function Aside({ totalPlaylistTracks }) {
    Aside.propTypes = {
        totalPlaylistTracks: PropTypes.string,
        currentlyPlaying: PropTypes.object,
    };
    return (
        <div className="aside">
            <h2>Notifications</h2>
            <div className="notifications-side">
                <div className="notify-container">
                    <RiPlayCircleFill className="notify" />
                </div>
                <Link to="/playlists">
                    <div className="inside-notifications">
                        <span>Playlist Added</span>
                        <p>{totalPlaylistTracks} songs</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
