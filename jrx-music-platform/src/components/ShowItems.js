import { RiSearch2Line } from 'react-icons/ri';
import Player from './Player';

export default function ShowItems() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="section">
        <div className="row">
          <form className="search" onSubmit={searchArtists}>
            <button className="searchArtists" type="submit">
              <input
                type="text"
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <RiSearch2Line style={{ color: '#05476b' }} />
            </button>
          </form>
        </div>
        <div className="render-artists">{renderArtists()}</div>
      </div>
      <Player token={token} />
    </div>
  );
}
