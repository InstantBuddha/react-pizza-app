import React, { Component } from 'react'

class OrderDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            clientInfo: {
                clientName: "",
                clientAddress: "",
                clientEmail: "",
                clientPhone: "",
                clientNotes: ""
            },
            tempClientInfo: {
                clientName: "",
                clientAddress: "",
                clientEmail: "",
                clientPhone: "",
                clientNotes: "",
                agreed: false
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        let copiedTempState = { ...this.state }

        switch (event.target.name) {
            case "name":
                copiedTempState.tempClientInfo.clientName = event.target.value
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

    handleSubmit(event){
        let copiedTempState = { ...this.state}
        if(!copiedTempState.tempClientInfo.agreed){
            alert("Is it a prank or you're hungry? Check the checkbox to get your food!")
        }
        
    }

    render() {
        return (
            <div>
                <h1>Order details</h1>
                <form onSubmit={this.handleSubmit} >
                    <label>Your name:
                        <input
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label >Your address:
                        <input
                            type="text"
                            name="address"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>Your email:
                        <input
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>Your phone number:
                        <input
                            type="tel"
                            name="telephone"
                            pattern="[0-9]{7}"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>Your message to the pizzaboy:
                        <input
                            type="text"
                            name="notes"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="agreed"
                            onChange={this.handleChange}
                        />
                        This is not a prank
                    </label>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default OrderDetails
