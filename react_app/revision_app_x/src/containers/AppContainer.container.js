import React from 'react'


export default (props) => (
<div className="app-container app-container__bg">
    <h2 class="app-container__title" style={{color:"#574b90"}}> {props.titulo} </h2>

    {props.children}
</div>)