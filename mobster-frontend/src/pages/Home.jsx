import React from 'react'
import MyFamilies from '../components/MyFamilies'
import MostPopularFamilies from '../components/MostPopularFamilies'
import AddThread from '../components/AddThread/AddThread'
import Welcome from '../components/Welcome'
import { useLocalStorage } from '../CustomHooks/useLocalStorage'

function Home() {
    const [user, setuser] = useLocalStorage('user', null)

    return (
        <div className="home">
            {user && (<MyFamilies />)}
            <div className="page-center">
                {user && <AddThread />}
                {!user && 
                <Welcome/>
                    }
                
            </div>
            <MostPopularFamilies />
        </div>
    )
}

export default Home
