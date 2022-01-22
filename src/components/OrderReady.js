import React, { Component } from 'react'
import TimeDisplayer from './TimeDisplayer';

class OrderReady extends Component {
    constructor(props) {
        super(props)

        this.state = {
            counter: {
                minutes: 45,
                seconds: 0
            },
            counterExpired: false
        }
        this.countDown = this.countDown.bind(this)
    }

    componentDidMount() {
        setTimeout(this.countDown, 1000);
    }

    countDown() {
        let tempState = { ...this.state }
        let newSeconds = tempState.counter.seconds
        let newMinutes = tempState.counter.minutes
        if (tempState.counter.seconds < 1) {
            if (tempState.counter.minutes < 1) {
                tempState.counterExpired = true
                this.setState(tempState)
                return;
            }
            newSeconds = 59
            newMinutes--;
        } else {
            newSeconds--;
        }

        tempState.counter = { minutes: newMinutes, seconds: newSeconds }
        this.setState(tempState)
        return setTimeout(this.countDown, 1000)
    }

    render() {
        const pizzasLitems = this.props.orderedPizzas.map(
            pizzaItem => <li>{pizzaItem.name}</li>
        )
        const drinksLitems = this.props.orderedDrinks.map(
            drinkItem => <li>{drinkItem.name}</li>
        )

        const bootstrapStyle = "w-50 m-1 border border-secondary mt-3"

        return (

            <div className={"d-flex justify-content-center"} >
                <div className={bootstrapStyle} >
                    <h1>Your order is on its way!</h1>
                    <h2>You have ordered the following:</h2>
                    {this.props.orderedPizzas && <ul>{pizzasLitems}</ul>}
                    {this.props.orderedDrinks && <ul>{drinksLitems}</ul>}
                    <p>with the name {this.props.userDetails.clientFirstName} {this.props.userDetails.clientLastName}</p>
                    <p>to the address of {this.props.userDetails.clientAddress}</p>
                    {this.state.counterExpired ?
                        <h2>Your pizza has arrived yeey!</h2>
                        :
                        <TimeDisplayer minutes={this.state.counter.minutes}
                            seconds={this.state.counter.seconds} />}
                    <button className="btn btn-success btn-lg btn-block mb-3"
                            onClick={this.props.backToMainPage}>Back to main page</button>
                </div>
            </div>
        )
    }

}

export default OrderReady