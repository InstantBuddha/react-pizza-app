import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PizzaCard(props) {
    const bootstrapStyle = "w-25 m-1 border border-secondary"

    const divCss = {
        backgroundImage: `url(${props.imageUrl})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
    }


    return (
        <div key={props.name}
            class={bootstrapStyle}
            style={divCss} >
            <div >
                <h1>{props.name}</h1>
                <h2>{props.ingredients}</h2>
                <h2>Full price: {props.fullPrice}</h2>
                <FontAwesomeIcon icon="check-square" />
                <FontAwesomeIcon icon="camera" />
                <FontAwesomeIcon icon="cart-plus" />
                <FontAwesomeIcon icon="shopping-cart" />
                <FontAwesomeIcon icon="coffee" />

            </div>
            <div>
            <button >{props.fullPrice}</button> 
            </div>

        </div>
    )
}
