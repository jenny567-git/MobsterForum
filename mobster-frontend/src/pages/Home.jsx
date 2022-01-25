import React from 'react'
//import MyFamilies from '../components/MyFamilies'
import MostPopularFamilies from '../components/MostPopularFamilies'
import AddThread from '../components/AddThread/AddThread'
import Thread from '../components/Thread/Thread'
//import { useAuth0 } from '@auth0/auth0-react';
function Home() {
    /*const {
        isAuthenticated
    } = useAuth0();*/
    return (
        <div className="home">
            {/* {isAuthenticated && (<MyFamilies />)} */}
            <div className="page-center">
                <AddThread />
                <Thread username="user1" familyName="family 1" threadDate="22/05/2022" title="hej" text="hejdå" ></Thread>
            </div>
            <MostPopularFamilies />
        </div>
    )
}

export default Home
