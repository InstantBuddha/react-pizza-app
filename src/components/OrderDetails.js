import React, { Component } from 'react'

class OrderDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             clientInfo:{
                 ClientName:"",
                 ClientAddress:"",
                 ClientEmail:"",
                 ClientPhone:"",
                 ClientNotes:""
             },
             tempClientInfo:{
                ClientName:"",
                ClientAddress:"",
                ClientEmail:"",
                ClientPhone:"",
                ClientNotes:"",
                agreed:false
             }
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        console.log(event.target)
        let copiedTempState = { ...this.state }

        //switch

        this.setState(copiedTempState)
    }
    
    render() {
        return (
            <div>
                <h1>Order details</h1>
                <form >
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
