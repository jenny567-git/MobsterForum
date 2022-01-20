import React, {useState} from 'react'
import FakeThread from '../components/Fakes/FakeThread'

const Family = () => {
    const [family, setfamily] = useState("Fake family")
    return (
        <div>
            <h1>{family}</h1>
            <button>Invite</button>
            <button>Edit</button>
            <FakeThread/>
            <FakeThread/>
            <FakeThread/>
        </div>
    )
}

export default Family
