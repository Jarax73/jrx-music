import { useState, useEffect } from "react";
import axios from "axios";
import {RiPlayCircleFill} from 'react-icons/ri';


export default function RecentlyPlayed({ token, setUrl }){
    const [recentlyPlayed, setRecentlyPlayed] = useState('');

    useEffect(()=>{
        axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
            headers: {
                Accept: "application/json",
                'Content-type': "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => setRecentlyPlayed(response.data.items)).catch(error => error);
    }, [])

    return <div>
        <h2 style={{marginLeft: '5%', marginTop: '10%'}}>Recently Played</h2>
        <div className="render-artists">
    {recentlyPlayed == "" ? "Loading..." : recentlyPlayed.map((played)=> 
        <div className="artist" key={played.track.id}>
            {played.track.album.images.length ? 
            <img src={played.track.album.images[0].url} alt=""/> : 
            <img src={played.track.album.images[0].url} alt="No image"/>}
            <div className='artist-played'>
                <div className="artist-detail">
                    {played.track.album.artists[0].name} <br/>
                    {played.track.name}
                </div>
                <div className='play' onClick={()=>{setUrl(played.track.uri)}}>                        
                    <RiPlayCircleFill/>
                </div>
            </div>
        </div>
    )
}
    </div>
    </div>
}