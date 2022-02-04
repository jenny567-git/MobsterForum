import React from 'react'
//import MyFamilies from '../components/MyFamilies'
import MostPopularFamilies from '../components/MostPopularFamilies'
import AddThread from '../components/AddThread/AddThread'
import Thread from '../components/Thread/Thread'
//import { useAuth0 } from '@auth0/auth0-react';
import { useLocalStorage } from '../CustomHooks/useLocalStorage'

function Home() {
    const [user, setuser] = useLocalStorage('user', null)
    /*const {
        isAuthenticated
    } = useAuth0();*/
    console.log(user);
    return (
        <div className="home">
            {/* {isAuthenticated && (<MyFamilies />)} */}
            <div className="page-center">
                {user && <AddThread />}
                {!user && 
                <div className="home-welcome">
                    <img src="https://p4.wallpaperbetter.com/wallpaper/648/248/988/marlon-brando-movies-the-godfather-vito-corleone-wallpaper-thumb.jpg" alt="Welcome" />
                    <h1>Welcome Rookie</h1>  
                    <h2>Log in or register to be part of the Family</h2>
                </div>
                    }
                
            </div>
            <MostPopularFamilies />
        </div>
    )
}

export default Home
