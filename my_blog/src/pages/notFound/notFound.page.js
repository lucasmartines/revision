import React from 'react'
import {Link} from 'react-router-dom'
export default () => {
    return(
        <div className="container">
            <h2>Ops... Not Found</h2>
            <Link to="/">Voltar para blog</Link>
        </div>
    )
}