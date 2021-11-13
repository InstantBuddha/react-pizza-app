import React, { Component } from 'react'
import PizzasLister from './PizzasLister'

class MainWrapper extends Component {
    constructor(props){
        super(props)

        this.state = {
            whatToShow: "pizzas",
            inCart: []
        }

        this.productCartAdder = this.productCartAdder.bind(this)
    }

    productCartAdder(productToAdd){
        console.log("productCartAdder")
        let copiedTempState = { ...this.state }
        copiedTempState.inCart.push(productToAdd)
        this.setState(copiedTempState)
        console.log(this.state)
    }



    render() {
        return (
            <div>
                <PizzasLister productCartAdder={this.productCartAdder} />
            </div>
        )
    }
}

export default MainWrapper
