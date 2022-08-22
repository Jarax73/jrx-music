

export default function Profile({profile}){
    return(
        <div style={{display: 'flex', fontSize: '10px', justifyContent: 'space-between'}}>
            {!profile.images ? [] : 
            <div style={{marginRight:'5px'}}>
                <img src={profile.images[0].url} alt={profile.display_name} style={{borderRadius:'50%'}}/>
            </div>}
            <div>
                <div>{profile.display_name}</div>
                <div>{profile.email}</div>
            </div>
        </div>
    )
}