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
            ready: false,
            whatToShow: pizzaConstants.pizzas
        }

        this.ingredientsLister = this.ingredientsLister.bind(this)
        this.ingredientsStringCreator = this.ingredientsStringCreator.bind(this)
        this.pizzaPriceCalculator = this.pizzaPriceCalculator.bind(this)
        this.cartAdder = this.cartAdder.bind(this)
        this.customizeAdder = this.customizeAdder.bind(this)
        this.modifiedIngredientListCreator = this.modifiedIngredientListCreator.bind(this)

    }

    async componentDidMount() {

        await axios.get("https://doclerlabs.github.io/mobile-native-challenge/pizzas.json")
            .then(response => {
                let copiedTempState = { ...this.state }
                copiedTempState.pizzas = response.data.pizzas
                copiedTempState.basePrice = response.data.basePrice
                this.setState(copiedTempState)
            })
            .catch(error => { console.log(error) })

        await axios.get("https://doclerlabs.github.io/mobile-native-challenge/ingredients.json")
            .then(response => {
                let copiedTempState = { ...this.state }
                copiedTempState.ingredients = response.data
                copiedTempState.ready = true
                this.setState(copiedTempState)
                //It might not be necessary
                this.props.saveIngredientsData(this.state)
            })
            .catch(error => { console.log(error) })

    }

    ingredientsLister(pizzaIngredientsIds) {
        return this.state.ingredients.filter(
            element => pizzaIngredientsIds.includes(element.id)
        )
    }

    ingredientsStringCreator(pizzaIngredientsIds) {
        return this.ingredientsLister(pizzaIngredientsIds)
            .map(ingredient => { return ingredient.name })
            .join(", ")
    }

    pizzaPriceCalculator(pizzaIngredientsIds) {
        return this.ingredientsLister(pizzaIngredientsIds)
            .map(ingredient => { return ingredient.price })
            .reduce((acc, current) => acc + current, this.state.basePrice)
    }

    //old version to add to cart, to be changed
    cartAdder(addedPizza) {
        this.props.productCartAdder(addedPizza, "pizza")
        this.state.whatToShow = pizzaConstants.pizzas
        console.log(addedPizza)
    }

    //new version to go to customize screen
    customizeAdder(addedPizza) {
        //console.log(addedPizza)
        let copiedTempState = { ...this.state }
        const uniqueIngredientsList = this.modifiedIngredientListCreator(addedPizza.ingredientsIDs,this.state.ingredients)
        copiedTempState.pizzaToModify = addedPizza
        copiedTempState.pizzaToModify.uniqueIngredientsList = uniqueIngredientsList
        copiedTempState.whatToShow = pizzaConstants.pizzaDetails
        this.setState(copiedTempState)
        
    }

    modifiedIngredientListCreator(idsList, allingredients){
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
                ingredients={this.ingredientsStringCreator(pizza.ingredients)}
                ingredientsIDs={pizza.ingredients}
                fullPrice={this.pizzaPriceCalculator(pizza.ingredients)}
                imageUrl={pizza.imageUrl}
                pizzaAdder={this.customizeAdder} />
        )

        //console.log(this.state)
        return (
            <div className={bootstrapCss}>
                {
                    this.state.ready ?
                        this.state.whatToShow == pizzaConstants.pizzas ? 
                        mappedPizzaCards : <CustomizePizza pizzaData={this.state.pizzaToModify}
                                                           basePrice={this.state.basePrice}
                                                           cartAdder={this.cartAdder}
                        /> 
                        : 
                        <i className="fa fa-spinner fa-spin"></i>
                }
            </div>
        )
    }
}

export default PizzasLister
