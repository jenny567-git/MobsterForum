import React, {useState, useContext} from 'react'
import { Context } from '../../utils/store'


const EditFamily = () => {
    const [context, updateContext] = useContext(Context)

    const testChange = () =>{

    }

    return (
        <div>
            <p>Name:</p>
            <input type="text" value={context.family.name} onChange={testChange}/>
            <p>Description:</p>
            <input type="text" value={context.family.description} onChange={testChange}/>
            <p>Current admin:</p>
            <input type="text" value={context.family.admin} onChange={testChange}/>
            <button>Save</button>
        </div>
    )
}

export default EditFamily
