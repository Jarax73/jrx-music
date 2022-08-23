import React from 'react';
import SearchArtists from './SearchArtists';
import RecentlyPlayed from './RecentlyPlayed';

export default function Home({ token, setUrl }) {
    
    return (
        <React.Fragment>
            <div className="section">
                <SearchArtists token={token} setUrl={setUrl} />
                <RecentlyPlayed token={token} setUrl={setUrl} />
            </div>            
        </React.Fragment>
    );
}
