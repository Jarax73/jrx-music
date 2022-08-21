

export default function Profile({profile}){
    return(
        <div style={{display: 'flex', fontSize: '10px'}}>
            {!profile.images ? [] : <img src={profile.images[0]}/>}
            <div>
            <div>{profile.display_name}</div>
            <div>{profile.email}</div></div>
        </div>
    )
}