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

        console.log(this.state)

    }

    ingredientsLister(pizzaIngredientsIds) {
        let pizzaIngredients = this.state.ingredients.filter(
            element => pizzaIngredientsIds.includes(element.id)
        )

        return pizzaIngredients
    }

    ingredientsStringCreator(pizzaIngredientsIds){
        const pizzaIngredients = this.ingredientsLister(pizzaIngredientsIds)
        let ingredientNameList = []
        pizzaIngredients.forEach(element => ingredientNameList.push(element.name))
        return ingredientNameList.join()
    }

    pizzaPriceCalculator(pizzaIngredientsIds){
        const pizzaIngredients = this.ingredientsLister(pizzaIngredientsIds)
        const pizzaPriceArr = pizzaIngredients.map(i => {return i.price})
        const pizzaFullPrice = pizzaPriceArr.reduce((acc, current)=>acc+current, this.state.basePrice)
        return pizzaFullPrice
    }

    render() {
        const pizzas = this.state.pizzas
        const bootstrapCss = "d-flex flex-column align-items-center"

        return (
            <div class={bootstrapCss}>
                {
                    this.state.ready ?
                        pizzas.map(
                            pizza => <PizzaCard key={pizza.name}
                                name={pizza.name}
                                ingredients={this.ingredientsStringCreator(pizza.ingredients)}
                                fullPrice={this.pizzaPriceCalculator(pizza.ingredients)}
                                imageUrl={pizza.imageUrl} />
                        ) : <i className="fa fa-spinner fa-spin"></i>
                }
            </div>
        )
    }
}

export default PizzasLister
