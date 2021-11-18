import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PizzaCard(props) {
    const bootstrapStyle = "w-25 m-1 border border-secondary container "

    const divCss = {
        backgroundImage: `url(${props.imageUrl})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
    }


    return (
        <div key={props.name}
            className={bootstrapStyle}
            style={divCss} >
            <div>
            </div>
            <div className="row align-items-end align-items-center">
                <div className="col-9 " >
                    <div>
                        <h1>{props.name}</h1>
                    </div>
                    <div>
                        <p >{props.ingredients}</p>
                    </div>

                </div>
                <div className="col-3">
                    <button onClick={() => props.pizzaAdder(
                        {
                            productType: "pizza",
                            pizzaName: props.name,
                            ingredients: props.ingredients,
                            price: props.fullPrice
                        })} >
                        <FontAwesomeIcon icon="cart-plus" />
                        {" $" + props.fullPrice}
                    </button>
                </div>

            </div>

        </div>
    )
}

export default PizzaCard