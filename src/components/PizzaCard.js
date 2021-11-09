import React from 'react'

export default function PizzaCard(props) {
    const divCss = {
        backgroundImage: `url(${props.imageUrl})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }

    
    return (
        <div key={props.name} style={divCss} >
            <h1>{props.name}</h1>
            <h2>{props.ingredients}</h2>
            <h2>Full price: {props.fullPrice}</h2>
        </div>
    )
}
