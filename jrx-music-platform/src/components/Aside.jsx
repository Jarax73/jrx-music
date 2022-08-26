import React from 'react';
import { RiPlayCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function Aside({ totalPlaylistTracks }) {
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
            <p>
              {totalPlaylistTracks}
              songs
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
