import React from 'react'
import MyFamilies from '../components/MyFamilies'
import MostPopularFamilies from '../components/MostPopularFamilies'
import AddThread from '../components/AddThread/AddThread'
import Thread from '../components/Thread/Thread'
import { useAuth0 } from '@auth0/auth0-react';
import { useLocalStorage } from '../CustomHooks/useLocalStorage'

function Home() {
    const [user, setuser] = useLocalStorage('user', null)

    console.log(user);

    return (
        <div className="home">
            {user && (<MyFamilies />)}
            <div className="page-center">
                <AddThread />
            </div>
            <MostPopularFamilies />
        </div>
    )
}

export default Home
