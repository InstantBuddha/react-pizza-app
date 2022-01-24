import React, { Component } from 'react'
import CartLister from './CartLister'
import DrinksLister from './DrinksLister'
import OrderDetails from './OrderDetails'
import OrderReady from './OrderReady'
import PizzasLister from './PizzasLister'
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

        this.productCartAdder = this.productCartAdder.bind(this)
        this.displaySelector = this.displaySelector.bind(this)
        this.listerReturner = this.listerReturner.bind(this)
        this.cartItemRemover = this.cartItemRemover.bind(this)
        this.proceedToCheckout = this.proceedToCheckout.bind(this)
        this.orderIsReadyDisplayer = this.orderIsReadyDisplayer.bind(this)
        this.backToMainPage = this.backToMainPage.bind(this)
        this.saveUserDetails = this.saveUserDetails.bind(this)
        this.saveIngredientsData = this.saveIngredientsData.bind(this)
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

    saveIngredientsData(ingredientsData){
        //it might not be necessary
        let copiedTempState = { ...this.state }
        copiedTempState.ingredientsData = { ...ingredientsData}
        this.setState(copiedTempState)
    }

    saveUserDetails(detailsToSave){
        let copiedTempState = { ...this.state }
        copiedTempState.userDetails = { ...detailsToSave}
        this.setState(copiedTempState)
    }

    proceedToCheckout(){
        this.displaySelector(constants.checkout)
    }

    orderIsReadyDisplayer(){
        this.displaySelector(constants.foodArriving)
    }

    backToMainPage(){
        this.displaySelector(constants.pizzas)
    }

    displaySelector(toDisplay) {
        let copiedTempState = { ...this.state }
        copiedTempState.whatToShow = toDisplay
        this.setState(copiedTempState)
    }

    listerReturner() {
        switch (this.state.whatToShow) {
            case constants.pizzas:
                return <PizzasLister productCartAdder={this.productCartAdder}
                                     saveIngredientsData={this.saveIngredientsData} />
            case constants.drinks:
                return <DrinksLister productCartAdder={this.productCartAdder} />
            case constants.cart:
                return <CartLister inCartList={this.state.inCart} 
                            cartItemRemover={this.cartItemRemover}
                            proceedToCheckout={this.proceedToCheckout} />
            case constants.checkout:
                return <OrderDetails orderIsReadyDisplayer={this.orderIsReadyDisplayer}
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
                {this.state.whatToShow !== constants.foodArriving && <TopMenu displaySelector={this.displaySelector} />}
                {this.listerReturner()}
            </div>
        )
    }
}

export default MainWrapper
