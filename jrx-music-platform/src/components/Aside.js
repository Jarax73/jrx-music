import React from 'react';
import Player from '../components/Player';

export default function Aside({token, redirectUrl}) {
    console.log(token);
  return (
    <div className="aside">
        <h2>Notifications</h2>
        <div className="notifications-side">
            <img src=""/>
            <div className="inside-notifications">
                <a href="#">Playlist Added</a>
                <p>200 songs</p>
            </div>
        </div>
        <div className="notifications-side">
            <img src=""/>
            <div className="inside-notifications">
                <a href="#">Playlist Shared</a>
                <p>To 8 users</p>
            </div>
        </div>
        <div className="notifications-side">
            <img src=""/>
            <div className="inside-notifications">
                <a href="#">New Music</a>
                <p>Beat it - Michael Jackson</p>
            </div>
        </div>
        <Player token={token} redirectUrl={redirectUrl}/>
    </div>
  )
}
