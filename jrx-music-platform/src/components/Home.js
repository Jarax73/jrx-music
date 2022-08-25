import React from 'react';
import RecentlyPlayed from './RecentlyPlayed';

export default function Home({ token, setUrl }) {
    
    return (
        <>
            <RecentlyPlayed token={token} setUrl={setUrl} />
        </> 
    );
}