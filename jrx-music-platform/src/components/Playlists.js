import axios from "axios";
import { useState, useEffect } from "react";


export default function Playlists({ token }){
    const [playlists, setPlaylists] = useState("");

    const takePlaylists = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/me/playlists", {
            Headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
    }
}
