import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CartCard(props) {
    const bootstrapStyle = "w-25 m-1 border border-secondary container "

    return (
        <div className={bootstrapStyle}>
            <div className={"row justify-content-between align-items-center"} >
                <div className="col-2">
                    <button ><FontAwesomeIcon icon="times" /></button>
                </div>
                <div className="col-8">
                    <h2>{props.name}</h2>
                </div>
                <div className="col-2">
                    ${props.price}
                </div>
            </div>
            
        </div>
    )
}

export default CartCard
