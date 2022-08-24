import { Link } from 'react-router-dom';
import { RiHome2Fill } from 'react-icons/ri';
import { RiSearch2Line } from 'react-icons/ri';
import { RiPlayList2Fill } from 'react-icons/ri';
import { RiMusic2Fill } from 'react-icons/ri';
import { RiLogoutCircleRFill } from 'react-icons/ri';
import Profile from '../Profile';

export default function Menu({ logout, profile }) {
    return (
            <div className="menu">
                <p className="logo">Jrx Music</p>
                <ul>
                <li>
                    <Profile profile={profile}/>
                </li>
                    <Link to="/">
                        <li>
                            <span className="icons">
                                <RiHome2Fill />
                            </span>
                            <div>Home</div>
                        </li>
                    </Link>
                    <Link to="/search">
                        <li>
                            <span className="icons">
                                <RiSearch2Line />
                            </span>
                            <div>Search</div>
                        </li>
                    </Link>
                    <Link to="/library">
                        <li>
                            <span className="icons">
                                <RiMusic2Fill />
                            </span>
                            <div>Library</div>
                        </li>
                    </Link>
                    <Link to="/playlists">
                        <li>
                            <span className="icons">
                                <RiPlayList2Fill />
                            </span>
                            <div>Playlists</div>
                        </li>
                    </Link>
                </ul>
                <div className="logout" onClick={logout}>
                    <span className="icons">
                        <RiLogoutCircleRFill />
                    </span>
                    <span>Log Out </span>
                </div>
            </div>
    );
}
