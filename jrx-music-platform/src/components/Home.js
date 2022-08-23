import React from 'react';
import SearchForm from './SearchForm';
import { Link } from 'react-router-dom'
import RecentlyPlayed from './RecentlyPlayed';

export default function Home({ token, setUrl, playTrack, setPlay }) {
    
    return (
        <React.Fragment>
            <div className="section">
                <Link to="/search" >
                    <SearchForm />
                </Link>
                <RecentlyPlayed token={token} setUrl={setUrl} playTrack={playTrack} setPlay={setPlay}/>
            </div>            
        </React.Fragment>
    );
}
