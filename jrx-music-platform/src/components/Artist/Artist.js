import { Artist } from 'react-spotify-api';


function Artist(artist) {
    return (
        <Artist id={["1XpDYCrUJnvCo9Ez6yeMWh","7jy3rLJdDQY21OgRLCZ9sD"]}>
            {(artists, loading, error) => (
                artists ? (
                    artists.map(artist => (
                        <h1 key={artist.id}>{artist.name}</h1>
                    ))
                ) : null
            )}
        </Artist>

}