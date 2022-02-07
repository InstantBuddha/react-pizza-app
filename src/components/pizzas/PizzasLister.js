import React, { Component } from 'react'
import axios from 'axios'
import PizzaCard from './PizzaCard'
import CustomizePizza from './CustomizePizza'

const pizzaConstants = {
    pizzas: "pizzas",
    pizzaDetails: "pizzaDetails"
}

class PizzasLister extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pizzas: [],
            ingredients: [],
            basePrice: 0,
            isReady: false,
            whatToShow: pizzaConstants.pizzas
        }

        this.listIngredients = this.listIngredients.bind(this)
        this.createIngredientsString = this.createIngredientsString.bind(this)
        this.calculatePizzaPrice = this.calculatePizzaPrice.bind(this)
        this.addToCart = this.addToCart.bind(this)
        this.addCustomizedPizza = this.addCustomizedPizza.bind(this)
        this.createModifiedIngredientsList = this.createModifiedIngredientsList.bind(this)
        this.addToPizzasList = this.addToPizzasList.bind(this)
    }

    async componentDidMount() {

        await axios.get("https://doclerlabs.github.io/mobile-native-challenge/pizzas.json")
            .then(response => {
                let copiedTempState = { ...this.state }
                this.addToPizzasList(response.data.pizzas)
                copiedTempState.pizzas = response.data.pizzas
                copiedTempState.basePrice = response.data.basePrice
                this.setState(copiedTempState)
            })
            .catch(error => { console.log(error) })

        await axios.get("https://doclerlabs.github.io/mobile-native-challenge/ingredients.json")
            .then(response => {
                let copiedTempState = { ...this.state }
                copiedTempState.ingredients = response.data
                copiedTempState.isReady = true
                this.setState(copiedTempState)
            })
            .catch(error =>  console.log(error) )

    }

    addToPizzasList(pizzasList){
        
        const emptyPizza = {
            ingredients: [],
            name: "Your Choice Pizza",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/20140704-0532_Balboa_Peninsula.JPG/320px-20140704-0532_Balboa_Peninsula.JPG"
        }        
        
        pizzasList.unshift(emptyPizza)
    }

    listIngredients(pizzaIngredientsIds) {
        return this.state.ingredients.filter(
            element => pizzaIngredientsIds.includes(element.id)
        )
    }

    createIngredientsString(pizzaIngredientsIds) {
        return this.listIngredients(pizzaIngredientsIds)
            .map(ingredient => { return ingredient.name })
            .join(", ")
    }

    calculatePizzaPrice(pizzaIngredientsIds) {
        return this.listIngredients(pizzaIngredientsIds)
            .map(ingredient => { return ingredient.price })
            .reduce((acc, current) => acc + current, this.state.basePrice)
    }

    addToCart(addedPizza) {
        if (!addedPizza.name){addedPizza.name = addedPizza.originalName}
        this.props.addToCart(addedPizza, "pizza")
        this.state.whatToShow = pizzaConstants.pizzas
    }
    
    addCustomizedPizza(addedPizza) {
        let copiedTempState = { ...this.state }
        const uniqueIngredientsList = this.createModifiedIngredientsList(addedPizza.ingredientsIDs,this.state.ingredients)
        copiedTempState.pizzaToModify = addedPizza
        copiedTempState.pizzaToModify.uniqueIngredientsList = uniqueIngredientsList
        copiedTempState.whatToShow = pizzaConstants.pizzaDetails
        this.setState(copiedTempState)        
    }

    createModifiedIngredientsList(idsList, allingredients){
        return allingredients.map((ingredient)=>{
            ingredient.isAdded = (idsList.includes(ingredient.id) ? true : false)
            return ingredient
        })
    }

    render() {
        const bootstrapCss = "d-flex flex-column align-items-center"
        const mappedPizzaCards = this.state.pizzas.map(
            pizza => <PizzaCard
                key={pizza.name}
                name={pizza.name}
                ingredients={this.createIngredientsString(pizza.ingredients)}
                ingredientsIDs={pizza.ingredients}
                fullPrice={this.calculatePizzaPrice(pizza.ingredients)}
                imageUrl={pizza.imageUrl}
                pizzaAdder={this.addCustomizedPizza} />
        )

        return (
            <div className={bootstrapCss}>
                {
                    this.state.isReady ?
                        this.state.whatToShow == pizzaConstants.pizzas ? 
                        mappedPizzaCards : <CustomizePizza pizzaName={this.state.pizzaToModify.name}
                                                           uniqueIngredientsList={this.state.pizzaToModify.uniqueIngredientsList} 
                                                           basePrice={this.state.basePrice}
                                                           fullPrice={this.state.pizzaToModify.price}
                                                           addToCart={this.addToCart}
                                                           customPriceCalculator={this.customPriceCalculator}
                        /> 
                        : 
                        <i className="fa fa-spinner fa-spin"></i>
                }
            </div>
        )
    }
}

export default PizzasLister
