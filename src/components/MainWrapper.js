import React, { Component } from 'react'
import CartLister from './CartLister'
import DrinksLister from './DrinksLister'
import PizzasLister from './PizzasLister'
import TopMenu from './TopMenu'

class MainWrapper extends Component {
    constructor(props){
        super(props)

        this.state = {
            whatToShow: "pizzas",
            inCart: {
                pizzas: [],
                drinks:[]
            }
        }

        this.productCartAdder = this.productCartAdder.bind(this)
        this.displaySelector = this.displaySelector.bind(this)
        this.listerReturner = this.listerReturner.bind(this)
    }

    productCartAdder(productToAdd, productType){
        let copiedTempState = { ...this.state }
        switch(productType){
            case "pizza":
                console.log("pizza")
                copiedTempState.inCart.pizzas.push(productToAdd)
                break
            case "drink":
                console.log("drink")
                copiedTempState.inCart.drinks.push(productToAdd)
                break
        }
                
        this.setState(copiedTempState)
    }


    displaySelector(toDisplay){
        let copiedTempState = { ...this.state }
        copiedTempState.whatToShow = toDisplay
        this.setState(copiedTempState)
    }

    listerReturner(){
        switch(this.state.whatToShow){
            case "pizzas":
                return <PizzasLister productCartAdder={this.productCartAdder} />
            case "drinks":
                return <DrinksLister productCartAdder={this.productCartAdder} />
            case "cart":
                return <CartLister inCartList={this.state.inCart} />
            default:
                console.log("there is a problem")
                break        

        }
    }

    render() {
        return (
            <div>
                <TopMenu displaySelector={this.displaySelector} />
                {this.listerReturner()}
            </div>
        )
    }
}

export default MainWrapper
