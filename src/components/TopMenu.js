import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TopMenu(props) {
    const buttonCss = "btn btn-outline-success px-3 mx-1"
    return (
        <div>
            <button class= {buttonCss}
                    onClick={ () => props.displaySelector("cart")} >
                <FontAwesomeIcon icon="shopping-cart" />
                </button>
            <button class= {buttonCss}
                    onClick={ () => props.displaySelector("pizzas")} >
                <FontAwesomeIcon icon="pizza-slice" />
                </button>
            <button class= {buttonCss}
                    onClick={ () => props.displaySelector("drinks")} >
                <FontAwesomeIcon icon="wine-glass-alt" />
                </button>
        </div>
    )
}
