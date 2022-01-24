import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function PizzaToppingCard(props) {
  return <div>
    <div><h1>{props.isAdded ? "yes" : "no"}</h1></div>
    <div><h1>{props.name}</h1></div>
    <div><h1>{props.price}</h1></div>
      
  </div>
}

export default React.memo(PizzaToppingCard)