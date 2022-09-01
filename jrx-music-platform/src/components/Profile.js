import PropTypes from 'prop-types';

export default function Profile({ profile }) {
    Profile.propTypes = {
        profile: PropTypes.object,
    };

    return (
        <div className="profile">
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
            <div className="profile-info">
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
