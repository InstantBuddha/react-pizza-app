import React from 'react'

function OrderReady(props) {
    return (
        <div>
            <h1>Your order is on its way!</h1>
            <h2 onClick={props.backToMainPage}>Back to main page</h2>
        </div>
    )
}

export default React.memo(OrderReady)