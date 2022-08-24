import React from 'react';
import RecentlyPlayed from './RecentlyPlayed';

export default function Home({ token, setUrl, playTrack, setPlay }) {
    
    return (
        <React.Fragment>
            <div className="section">
                <RecentlyPlayed token={token} setUrl={setUrl} playTrack={playTrack} setPlay={setPlay}/>
            </div>            
        </React.Fragment>
    );
}
