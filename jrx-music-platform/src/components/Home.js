import React from 'react';
import Menu from './Header';
import Aside from './Aside';
import SearchArtists from './SearchArtists';
import RecentlyPlayed from './RecentlyPlayed';
import Player from './Player';

export default function Home({ token, logout, profile, setUrl, url }) {
    
    return (
        <React.Fragment>
            
            {/* <div style={{display: 'flex', flexDirection: 'column'}}> */}
                <div className="section">
                    <SearchArtists token={token} setUrl={setUrl} />
                    <RecentlyPlayed token={token} setUrl={setUrl} />
                </div>
            {/* <Player token={token} url={url}/> */}
            {/* </div> */}
            
        </React.Fragment>
    );
}
