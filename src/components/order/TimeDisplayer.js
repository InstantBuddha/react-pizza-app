import React from 'react'

export default function TimeDisplayer(props) {
    return (
        <div>
             <h2>Time until your pizza arrives:</h2>
            <h2>
                {props.minutes}:
                {props.seconds < 10 && 0}
                {props.seconds}
            </h2>
        </div>
    )
}
