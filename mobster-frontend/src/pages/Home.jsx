import React from 'react'
import MyFamilies from '../components/MyFamilies'
import MostPopularFamilies from '../components/MostPopularFamilies'
import AddThread from '../components/AddThread'

function Home() {
    return (
        <div className="home">
            <MyFamilies />
            <AddThread />
            <MostPopularFamilies />
        </div>
    )
}

export default Home
