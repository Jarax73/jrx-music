

export default function Menu(){

    return (
        <BrowserRoute>
        <div className="menu">
            <ul>
                <ul>
                    <h2>Menu</h2>
                    <li><a href=""><img src="" alt=""/>Home</a></li>
                    <li><a href=""><img src="" alt="" />Trends</a></li>
                    <li><a href=""><img src="" alt="" />Library</a></li>
                    <li><a href=""><img src="" alt="" />Discover</a></li>
                </ul>
                <ul>
                    <h2>Discover</h2>
                    <li><a href=""><img src="" alt=""/>Playlists</a></li>
                    <li><a href=""><img src="" alt="" />Daily Mix</a></li>
                </ul>
                <ul>
                    <h2>Your collection</h2>
                    <li><a href=""><img src="" alt="" />Liked Songs</a></li>
                    <li><a href=""><img src="" alt="" />Favorite Artists</a></li>
                </ul>
            </ul>
        </div>
        </BrowserRoute>
    )
}