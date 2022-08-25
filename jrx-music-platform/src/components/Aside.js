import React from 'react';
import { RiPlayCircleFill } from 'react-icons/ri';
import { IoMusicalNotesSharp } from 'react-icons/io5';

export default function Aside({ totalPlaylistTracks }) {
    
    return (
        <div className="aside">
            <h2>Notifications</h2>
            <div className="notifications-side">
                <div className="notify-container">
                    <RiPlayCircleFill className="notify" />
                </div>
                <div className="inside-notifications">
                    <a href="#">Playlist Added</a>
                    <p>{totalPlaylistTracks} songs</p>
                </div>
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
