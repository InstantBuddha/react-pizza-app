import React from 'react'

function FullPrice(props) {
    const bootstrapStyle = "w-25 m-1 border border-secondary container "
    return (
        <div className={bootstrapStyle}>
            <div >
                <div className={"row justify-content-between align-items-center"} >
                    <div className="col-2">

                    </div>
                    <div className="col-8">
                        <h2>Total Price: </h2>
                    </div>
                    <div className="col-2">
                        <h5>${props.fullPrice}</h5>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default React.memo(FullPrice)
