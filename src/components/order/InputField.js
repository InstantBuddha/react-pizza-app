import React from 'react'

function InputField(props) {
    return (
        <label>{props.labelText}
            <input
                name={props.name}
                type={props.type}
                onChange={props.onChange}
                pattern={props.pattern}
                placeholder={props.placeholder}
                className={props.className}
            />
        </label>
    )
}

export default React.memo(InputField)