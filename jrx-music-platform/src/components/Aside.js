import React from 'react';
import { RiPlayCircleFill } from 'react-icons/ri';
import { IoMusicalNotesSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function Aside({ totalPlaylistTracks }) {
    
    return (
        <div className="aside">
            <h2>Notifications</h2>
            <div className="notifications-side">
                <div className="notify-container">
                    <RiPlayCircleFill className="notify" />
                </div>
                <Link to='/playlists'>
                    <div className="inside-notifications">
                        <span>Playlist Added</span>
                        <p>{totalPlaylistTracks} songs</p>
                    </div>
                </Link>
            </div>
            <div className="notifications-side">
                <div className="notify-container">
                    <RiPlayCircleFill className="notify" />
                </div>
                <div className="inside-notifications">
                    <a href="#">Playlist Shared</a>
                    <p>To 8 users</p>
                </div>
            </div>
            <div className="notifications-side">
                <div className="notify-container">
                    <IoMusicalNotesSharp className="notify" />
                </div>
                <div className="inside-notifications">
                    <a href="#">New Music</a>
                    <p>Beat it - Michael Jackson</p>
                </div>
            </div>
        </div>
    );
}