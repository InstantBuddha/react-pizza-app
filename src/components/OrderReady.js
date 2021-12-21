import React from 'react'

function OrderReady(props) {
    return (
        <div>
            <h1>Your order is on its way!</h1>
        </div>
    )
}

export default React.memo(OrderReady)