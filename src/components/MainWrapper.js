import React, { Component } from 'react'
import CartLister from './CartLister'
import DrinksLister from './DrinksLister'
import OrderDetails from './OrderDetails'
import PizzasLister from './PizzasLister'
import TopMenu from './TopMenu'

class MainWrapper extends Component {
    constructor(props) {
        super(props)

        this.state = {
            whatToShow: "pizzas",
            inCart: {
                pizzas: [],
                drinks: []
            }
        }

        this.productCartAdder = this.productCartAdder.bind(this)
        this.displaySelector = this.displaySelector.bind(this)
        this.listerReturner = this.listerReturner.bind(this)
        this.cartItemRemover = this.cartItemRemover.bind(this)
        this.proceedToCheckout = this.proceedToCheckout.bind(this)
    }

    productCartAdder(productToAdd, productType) {
        let copiedTempState = { ...this.state }
        switch (productType) {
            case "pizza":
                copiedTempState.inCart.pizzas.push(productToAdd)
                break
            case "drink":
                copiedTempState.inCart.drinks.push(productToAdd)
                break
            default:
                break
        }

        this.setState(copiedTempState)
    }

    cartItemRemover(toRemove){
        let copiedTempState = { ...this.state }
        let toRemoveCleaned = toRemove.split("")
        switch (toRemoveCleaned[0]) {
            case "p":
                copiedTempState.inCart.pizzas.splice(parseInt(toRemoveCleaned[1]),1)
                break
            case "d":
                copiedTempState.inCart.drinks.splice(parseInt(toRemoveCleaned[1]),1)
                break
            default:
                break        
        }
        this.setState(copiedTempState)
    }

    proceedToCheckout(){
        this.displaySelector("checkout")
    }

    displaySelector(toDisplay) {
        let copiedTempState = { ...this.state }
        copiedTempState.whatToShow = toDisplay
        this.setState(copiedTempState)
    }

    listerReturner() {
        switch (this.state.whatToShow) {
            case "pizzas":
                return <PizzasLister productCartAdder={this.productCartAdder} />
            case "drinks":
                return <DrinksLister productCartAdder={this.productCartAdder} />
            case "cart":
                return <CartLister inCartList={this.state.inCart} 
                            cartItemRemover={this.cartItemRemover}
                            proceedToCheckout={this.proceedToCheckout} />
            case "checkout":
                return <OrderDetails />                
            default:
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
