import React, { Component } from 'react'
import axios from 'axios'
import PizzaCard from './PizzaCard'

class PizzasLister extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pizzas: [],
            ingredients: [],
            basePrice: 0,
            ready: false
        }

        this.ingredientsLister = this.ingredientsLister.bind(this)
        this.ingredientsStringCreator = this.ingredientsStringCreator.bind(this)
        this.pizzaPriceCalculator = this.pizzaPriceCalculator.bind(this)
        this.cartAdder = this.cartAdder.bind(this)

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
            })
            .catch(error => { console.log(error) })

    }

    ingredientsLister(pizzaIngredientsIds) {
        return this.state.ingredients.filter(
            element => pizzaIngredientsIds.includes(element.id)
        )
    }

    ingredientsStringCreator(pizzaIngredientsIds){
       return this.ingredientsLister(pizzaIngredientsIds)
       .map(ingredient => {return ingredient.name})
       .join(", ")
    }

    pizzaPriceCalculator(pizzaIngredientsIds){
       return this.ingredientsLister(pizzaIngredientsIds)
       .map(ingredient => {return ingredient.price})
       .reduce((acc, current)=>acc+current, this.state.basePrice)
    }

    cartAdder(addedPizza){
        this.props.productCartAdder(addedPizza, "pizza")
    }

    render() {
        const pizzas = this.state.pizzas
        const bootstrapCss = "d-flex flex-column align-items-center"

        return (
            <div className={bootstrapCss}>
                {
                    this.state.ready ?
                        pizzas.map(
                            pizza => <PizzaCard 
                                key={pizza.name}
                                name={pizza.name}
                                ingredients={this.ingredientsStringCreator(pizza.ingredients)}
                                fullPrice={this.pizzaPriceCalculator(pizza.ingredients)}
                                imageUrl={pizza.imageUrl}
                                pizzaAdder={this.cartAdder} />
                        ) : <i className="fa fa-spinner fa-spin"></i>
                }
            </div>
        )
    }
}

export default PizzasLister
