import { useState, useEffect } from "react";
import axios from "axios";



export default function RecentlyPlayed({token, setUrl }){
    const [recentlyPlayed, setRecentlyPlayed] = useState('');

    useEffect(()=>{
        axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=5', {
            headers: {
                Accept: "application/json",
                'Content-type': "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => setRecentlyPlayed(response.data.items)).catch(error => console.log(error));
    }, [])

    return <div>
        <h2 style={{marginLeft: '5%'}}>Recently Played</h2>
        <div className="render-artists">
    {recentlyPlayed == "" ? "Loading..." : recentlyPlayed.map((played)=> 
        <div className="artist" key={played.track.id} onClick={()=>{setUrl(played.track.uri)}}>
            {played.track.album.images.length ? <img width={"100%"}  height={"100%"} src={played.track.album.images[0].url} alt=""/> : <div>No image</div>}
            <div className="artist-detail">
                {played.track.album.artists[0].name} <br/>
                {played.track.name}<br/>
                {played.track.album.name}
            </div>
        </div>
    )
}
    </div>
    </div>
}

{/* <div className="artist" key={artist.id} onClick={()=>setUrl(artist.uri)}>
                {artist.images.length ? <img width={"100%"} height={"100%"} src={artist.images[0].url} alt="" /> : <div>No image</div>}
                <div className="artist-detail">
                    {artist.name}<br/>
                    {artist.genres[0]}
                </div>
            </div> */}