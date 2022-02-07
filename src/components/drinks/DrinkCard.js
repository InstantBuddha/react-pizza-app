import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function DrinkCard(props) {
    const bootstrapStyle = "w-25 m-1 border border-secondary container "
    const buttonCss = "btn btn-success px-1"

    return (
        <div key={props.drinkId}
            className={bootstrapStyle}>
            <div className={"row justify-content-between align-items-center"}>
                <div className="col-2">
                    <button class= {buttonCss}
                            onClick={()=> props.addToCart(props.drink)} >
                        <FontAwesomeIcon icon="cart-plus" />
                    </button>
                </div>
                <div className="col-8">
                    <h2>{props.drink.name}</h2>
                </div>
                <div className="col-2">
                    <h5>${props.drink.price}</h5>
                </div>
            </div>

        </div>
    )
}

export default React.memo(DrinkCard) 
