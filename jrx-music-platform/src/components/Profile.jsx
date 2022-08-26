export default function Profile({ profile }) {
  return (
    <div
      style={{
        display: 'flex',
        fontSize: '10px',
        justifyContent: 'space-between',
      }}
    >
      {Array.isArray(profile.images) && profile.images.length ? (
        <div style={{ marginRight: '5px' }}>
          <img
            src={profile.images[0].url}
            alt={profile.display_name}
            style={{ borderRadius: '50%' }}
          />
        </div>
      ) : (
        []
      )}
      <div>
        <div
          style={{
            marginBottom: '3%',
          }}
        >
          {profile.display_name}
        </div>
        <div>{profile.email}</div>
      </div>
    </div>
  );
}
