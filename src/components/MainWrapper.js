import React, { Component } from 'react'
import CartLister from './cart/CartLister'
import DrinksLister from './drinks/DrinksLister'
import OrderDetails from './order/OrderDetails'
import OrderReady from './order/OrderReady'
import PizzasLister from './pizzas/PizzasLister'
import TopMenu from './TopMenu'

const constants = {
    pizzas: "pizzas",
    drinks: "drinks",
    cart: "cart",
    checkout: "checkout",
    foodArriving: "foodArriving"
}

class MainWrapper extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            whatToShow: constants.pizzas,
            inCart: {
                pizzas: [],
                drinks: []
            }
        }

        this.addToCart = this.addToCart.bind(this)
        this.selectDisplay = this.selectDisplay.bind(this)
        this.returnLister = this.returnLister.bind(this)
        this.removeFromCart = this.removeFromCart.bind(this)
        this.proceedToCheckout = this.proceedToCheckout.bind(this)
        this.displayOrderIsReady = this.displayOrderIsReady.bind(this)
        this.backToMainPage = this.backToMainPage.bind(this)
        this.saveUserDetails = this.saveUserDetails.bind(this)
    }

    addToCart(productToAdd, productType) {
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

    removeFromCart(toRemove){
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


    saveUserDetails(detailsToSave){
        let copiedTempState = { ...this.state }
        copiedTempState.userDetails = { ...detailsToSave}
        this.setState(copiedTempState)
    }

    proceedToCheckout(){
        this.selectDisplay(constants.checkout)
    }

    displayOrderIsReady(){
        this.selectDisplay(constants.foodArriving)
    }

    backToMainPage(){
        this.selectDisplay(constants.pizzas)
    }

    selectDisplay(toDisplay) {
        let copiedTempState = { ...this.state }
        copiedTempState.whatToShow = toDisplay
        this.setState(copiedTempState)
    }

    returnLister() {
        switch (this.state.whatToShow) {
            case constants.pizzas:
                return <PizzasLister addToCart={this.addToCart}
                                     saveIngredientsData={this.saveIngredientsData} />
            case constants.drinks:
                return <DrinksLister addToCart={this.addToCart} />
            case constants.cart:
                return <CartLister inCartList={this.state.inCart} 
                            removeFromCart={this.removeFromCart}
                            proceedToCheckout={this.proceedToCheckout} />
            case constants.checkout:
                return <OrderDetails displayOrderIsReady={this.displayOrderIsReady}
                                     saveUserDetails={this.saveUserDetails} />
            case constants.foodArriving:
                return <OrderReady backToMainPage={this.backToMainPage}
                                   orderedPizzas={this.state.inCart.pizzas}
                                   orderedDrinks={this.state.inCart.drinks}
                                   userDetails={this.state.userDetails} />                    
            default:
                break

        }
    }

    render() {
        return (
            <div>
                {this.state.whatToShow !== constants.foodArriving && <TopMenu selectDisplay={this.selectDisplay} />}
                {this.returnLister()}
            </div>
        )
    }
}

export default MainWrapper
