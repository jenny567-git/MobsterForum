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
                <Thread></Thread>
            </div>
            <MostPopularFamilies />
        </div>
    )
}

export default Home
