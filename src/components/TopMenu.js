import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TopMenu(props) {
    return (
        <div>
            <button onClick={ () => props.displaySelector("cart")} >
                <FontAwesomeIcon icon="shopping-cart" />
                </button>
            <button onClick={ () => props.displaySelector("pizzas")} >
                <FontAwesomeIcon icon="pizza-slice" />
                </button>
            <button onClick={ () => props.displaySelector("drinks")} >
                <FontAwesomeIcon icon="wine-glass-alt" />
                </button>
        </div>
    )
}
