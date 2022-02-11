import React from 'react'
import ProfileInformation from '../components/ProfileInformation';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

function Profile({setIsAuthorized}) {
    return (
        <div className="profile">
            
            <ProfileInformation setIsAuthorized = {setIsAuthorized}/>
        </div>
    )
}


export default withAuthenticationRequired(Profile, {  });