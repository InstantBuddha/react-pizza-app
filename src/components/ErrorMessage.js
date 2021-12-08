import React from 'react'

function ErrorMessage(props) {
    return (
        <div className="alert alert-danger m-2">
            <h5>{props.message}</h5>
        </div>
    )
}

export default React.memo(ErrorMessage)