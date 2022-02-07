import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PizzaCard(props) {
    const bootstrapStyle = "w-25 m-1 border border-secondary container "

    const replacementImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Pizza_%2847955822167%29.jpg/240px-Pizza_%2847955822167%29.jpg"

    const divCss = {
        backgroundImage: `url(${props.imageUrl ? props.imageUrl : replacementImageUrl})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
    }

    const buttonCss = "btn btn-success px-1"

    return (
        
        <div key={props.name}
            className={bootstrapStyle}
            style={divCss} >
            <div style={{height: "60px"}}>
            </div>
            
            <div className="row align-items-end align-items-center border-top border-success"
                    style={{background: "rgba(184,184,184, 0.7)"}}>
                <div className="col-9 " >
                    <div>
                        <h1>{props.name}</h1>
                    </div>
                    <div>
                        <p >{props.ingredients}</p>
                    </div>

                </div>
                <div className="col-3">
                    <button class= {buttonCss}
                            onClick={() => props.pizzaAdder(
                        {
                            name: props.name,
                            ingredients: props.ingredients,
                            price: props.fullPrice,
                            ingredientsIDs: props.ingredientsIDs
                        })} >
                        <FontAwesomeIcon icon="cart-plus" />
                        {" $" + props.fullPrice}
                    </button>
                </div>

            </div>

        </div>
    )
}

export default React.memo(PizzaCard) 