import React, { Component } from 'react'
import ErrorMessage from './ErrorMessage'

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

        console.log(copiedTempState)
        this.setState(copiedTempState)
    }

    handleSubmit(event) {
        let copiedTempState = { ...this.state }
        if (!copiedTempState.tempClientInfo.agreed) {
            copiedTempState.errorMessage = "Is it a prank or you're hungry? Check the checkbox to get your food!"
        }

        this.setState(copiedTempState)
        event.preventDefault()

    }

    render() {
        const bootstrapCss = "d-flex flex-column align-items-center"
        const customCSS = {
            wrapper: "border border-secondary p-2 rounded bg-light",
            inputs: "form-control m-1",
            texts: "form-text mt-2 mb-2",
            checkbox: "form-check-input m-1",
            button: "btn btn-primary mt-1 "
        }

        return (
            <div className={bootstrapCss} >
                <div className={"w-25 m-1 container "}>
                    <div className={customCSS.wrapper}>
                        <h1>Order details</h1>

                        <form onSubmit={this.handleSubmit} >
                            <label>First name:
                                <input
                                    type="text"
                                    name="firstName"
                                    onChange={this.handleChange}
                                    className={customCSS.inputs}
                                />
                            </label>
                            <label>Last name:
                                <input
                                    type="text"
                                    name="lastName"
                                    onChange={this.handleChange}
                                    className={customCSS.inputs}
                                />
                            </label>
                            <label >Your address:
                                <input
                                    type="text"
                                    name="address"
                                    onChange={this.handleChange}
                                    className={customCSS.inputs}
                                />
                            </label>
                            <label>Your email:
                                <input
                                    type="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    className={customCSS.inputs}
                                />
                            </label>
                            <label>Your phone number:
                                <input
                                    type="tel"
                                    name="telephone"
                                    pattern="^[+]?[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
                                    onChange={this.handleChange}
                                    className={customCSS.inputs}
                                />
                            </label>
                            <label>Your message to the pizzaboy:
                                <input
                                    type="text"
                                    name="notes"
                                    placeholder="The doorbell doesn't work, call me instead"
                                    onChange={this.handleChange}
                                    className={customCSS.inputs}
                                />
                            </label>
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
