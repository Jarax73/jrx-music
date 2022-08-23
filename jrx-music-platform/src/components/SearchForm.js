import { RiSearch2Line } from 'react-icons/ri';

export default function SearchForm({ searchArtists, setSearchKey }){
    return(
        <div className="row">
            <form className="search" onSubmit={searchArtists}>
                <button className="searchArtists" type="submit">
                    <input
                        type="text"
                        onChange={e => setSearchKey(e.target.value)}
                    />
                    <RiSearch2Line style={{ color: 'white' }} />
                </button>
            </form>
        </div>
    )
}