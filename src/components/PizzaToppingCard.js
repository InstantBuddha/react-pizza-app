import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons'

function PizzaToppingCard(props) {

  const bootstrapStyle = "m-1 border border-secondary container "

  return (

    <div key={props.name}
      className={bootstrapStyle}>
      <div className={"row justify-content-between align-items-center"}>
        <div className="col-2" >
              {props.isAdded ?
                <FontAwesomeIcon icon={faCheckSquare}
                     onClick={ ()=> props.toppingAddedSwitcher(props.ingredientID)}  />
              :
                <FontAwesomeIcon icon={faSquare}
                     onClick={ ()=> props.toppingAddedSwitcher(props.ingredientID)}  />
              }
        </div>
        <div className="col-8"><h2>{props.name}</h2></div>
        <div className="col-2"><h5>${props.price}</h5></div>
      </div>


    </div>
  )
}

export default React.memo(PizzaToppingCard)