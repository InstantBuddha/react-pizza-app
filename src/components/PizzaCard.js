import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PizzaCard(props) {
    const bootstrapStyle = "w-25 m-1 border border-secondary container "

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
            <div>
            </div>    
            <div class="row align-items-end">
                <div class="col-9 " >
                    <div>
                        <h1>{props.name}</h1>
                    </div>
                    <div>
                        <p >{props.ingredients}</p>
                    </div>

                </div>
                <div class="col-3">
                    <button >
                        <FontAwesomeIcon icon="cart-plus" />
                        {" $" + props.fullPrice}
                    </button>
                </div>

            </div>

        </div>
    )
}
