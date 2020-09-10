import React from 'react'
import { useMetadata } from './../context/Metadata.context'
import {Link} from 'react-router-dom'

export default () => {

    const [version,setVersion] = useMetadata()

    return(            
        <nav className="navbar">
            Version {version}
            <ul>
                <li> 
                    <Link to="/">Blog</Link>
                    <Link to="/admin">Inserir Post </Link>
                </li>
            </ul>
        </nav>
    )
}