import React, { Component } from 'react'
import ErrorMessage from './ErrorMessage'
import InputField from './InputField'

class OrderDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            clientInfo: {
                clientFirstName: "",
                clientLastName: "",
                clientAddress: "",
                clientEmail: "",
                clientPhone: "",
                clientNotes: ""
            },
            tempClientInfo: {
                clientFirstName: "",
                clientLastName: "",
                clientAddress: "",
                clientEmail: "",
                clientPhone: "",
                clientNotes: "",
                agreed: false
            },
            errorMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkRegex = this.checkRegex.bind(this)
    }

    handleChange(event) {
        let copiedTempState = { ...this.state }
        switch (event.target.name) {
            case "firstName":
                copiedTempState.tempClientInfo.clientFirstName = event.target.value
                break
            case "lastName":
                copiedTempState.tempClientInfo.clientLastName = event.target.value
                break
            case "address":
                copiedTempState.tempClientInfo.clientAddress = event.target.value
                break
            case "email":
                copiedTempState.tempClientInfo.clientEmail = event.target.value
                break
            case "telephone":
                copiedTempState.tempClientInfo.clientPhone = event.target.value
                break
            case "notes":
                copiedTempState.tempClientInfo.clientNotes = event.target.value
                break
            case "agreed":
                copiedTempState.tempClientInfo.agreed = !copiedTempState.tempClientInfo.agreed
                break
        }

        copiedTempState.errorMessage = false
        this.setState(copiedTempState)
    }

    handleSubmit(event) {
        const allRegex = {
            clientFirstName: "^[a-zA-Z]{3,}$",
            clientLastName: "^[a-zA-Z]{3,}$",
            clientAddress: "[a-zA-Z]{3,}\\s+[0-9]+",
            clientEmail: "^[a-zA-Z0-9_!#$&+~.-]{3,}@[a-zA-Z0-9.-]{3,}\\.[a-zA-Z]{2,6}$",
            clientPhone: "^(00[0-9]{11,}$)|(\\+[0-9]{11,}$)"
        }
        const errorrMessages = {
            clientFirstName: "Something is not ok with your First Name. It should be at least 3 characters long and without weard symbols or numbers.",
            clientLastName: "Something is not ok with your Last Name. It should be at least 3 characters long and without weard symbols or numbers.",
            clientAddress: "Something is not ok with your address. It should contain your house number as well.",
            clientEmail: "Something is not ok with your email address",
            clientPhone: "Your phone number should start with 00 or + and it should have the country code as well.",
            agreed: "Is it a prank or you're hungry? Check the checkbox to get your food!"
        }

        event.preventDefault()

        let copiedTempState = { ...this.state }


        let foundErrorMessages = []
        Object.keys(copiedTempState.tempClientInfo).forEach((key) => {
            if (!this.checkRegex(copiedTempState.tempClientInfo[key], allRegex[key])) {
                foundErrorMessages.push(errorrMessages[key])
            }

        })

        if (!copiedTempState.tempClientInfo.agreed) {
            foundErrorMessages.push(errorrMessages.agreed)
        }

        if (foundErrorMessages.length < 1) {
            copiedTempState.clientInfo = { ...copiedTempState.tempClientInfo }
            this.setState(copiedTempState, () => {
                this.props.saveUserDetails(this.state.clientInfo)
                this.props.displayOrderIsReady()
            })
        } else {
            copiedTempState.errorMessage = foundErrorMessages[0]
            this.setState(copiedTempState)
        }

    }

    checkRegex(textToCheck, regex) {
        const tempRegex = new RegExp(regex)
        return tempRegex.test(textToCheck)
    }

    render() {
        const bootstrapCss = "d-flex flex-column align-items-center"

        const formInputs = [
            {
                name: "firstName",
                labelText: "First name:",
                type: "text",
                pattern: ".+",
                placeholder: "i.e.: John"
            },
            {
                name: "lastName",
                labelText: "Last name:",
                type: "text",
                pattern: ".+",
                placeholder: "i.e.: Doe"
            },
            {
                name: "address",
                labelText: "Your address:",
                type: "text",
                pattern: ".+",
                placeholder: ""
            },
            {
                name: "email",
                labelText: "Your email:",
                type: "email",
                pattern: ".+",
                placeholder: ""
            },
            {
                name: "telephone",
                labelText: "Your phone number:",
                type: "tel",
                pattern: "^[+]?[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$",
                placeholder: ""
            },
            {
                name: "notes",
                labelText: "Your message to the pizzaboy:",
                type: "notes",
                pattern: ".*",
                placeholder: "i.e.: The doorbell doesn't work, call me instead"
            },
        ]

        const customCSS = {
            wrapper: "border border-secondary p-2 rounded bg-light",
            inputs: "form-control m-1",
            texts: "form-text mt-2 mb-2",
            checkbox: "form-check-input m-1",
            button: "btn btn-primary mt-1 "
        }

        const inputFields = formInputs.map(
            formInput => <InputField
                key={formInput.name}
                name={formInput.name}
                labelText={formInput.labelText}
                type={formInput.type}
                onChange={this.handleChange}
                pattern={formInput.pattern}
                placeholder={formInput.placeholder}
                className={customCSS.inputs} />
        )
        return (
            <div className={bootstrapCss} >
                <div className={"w-25 m-1 container "}>
                    <div className={customCSS.wrapper}>
                        <h1>Order details</h1>

                        <form onSubmit={this.handleSubmit} >
                            {inputFields}
                            <br />
                            <label>
                                <input
                                    type="checkbox"
                                    name="agreed"
                                    onChange={this.handleChange}
                                    className={customCSS.checkbox}
                                />
                                This is not a prank
                            </label>
                            <input type="submit"
                                className={customCSS.button} />
                        </form>
                        {this.state.errorMessage &&
                            <ErrorMessage message={this.state.errorMessage} />}


                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetails
