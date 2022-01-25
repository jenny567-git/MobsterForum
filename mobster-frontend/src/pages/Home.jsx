import React from 'react'
import MyFamilies from '../components/MyFamilies'
import MostPopularFamilies from '../components/MostPopularFamilies'
import AddThread from '../components/AddThread/AddThread'
import Thread from '../components/Thread/Thread'
function Home() {
    return (
        <div className="home">
            <MyFamilies />
            <div className="page-center">
                <AddThread />
                <Thread username="user1" familyName="family 1" threadDate="22/05/2022" title="hej" text="hejdå" ></Thread>
            </div>
            <MostPopularFamilies />
        </div>
    )
}

export default Home
