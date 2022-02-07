import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const constants = {
    pizzas: "pizzas",
    drinks: "drinks",
    cart: "cart"
}

function TopMenu(props) {
    const buttonCss = "btn btn-outline-success px-3 mx-1"
    return (
        <div>
            <button class= {buttonCss}
                    onClick={ () => props.selectDisplay(constants.cart)} >
                <FontAwesomeIcon icon="shopping-cart" />
                </button>
            <button class= {buttonCss}
                    onClick={ () => props.selectDisplay(constants.pizzas)} >
                <FontAwesomeIcon icon="pizza-slice" />
                </button>
            <button class= {buttonCss}
                    onClick={ () => props.selectDisplay(constants.drinks)} >
                <FontAwesomeIcon icon="wine-glass-alt" />
                </button>
        </div>
    )
}

export default React.memo(TopMenu)