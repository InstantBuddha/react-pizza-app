import React, { Component } from 'react'
import axios from 'axios'
import PizzaCard from './PizzaCard'

class PizzasLister extends Component {
    constructor(props){
        super(props)

        this.state = {
            pizzas: [],
            ingredients: [],
            basePrice: 0,
            ready: false
        }

        this.ingredientsLister = this.ingredientsLister.bind(this)
        this.pizzaDetailsCalculator = this.pizzaDetailsCalculator.bind(this)

    }

    async componentDidMount(){
        
        await axios.get("https://doclerlabs.github.io/mobile-native-challenge/pizzas.json")
        .then(response => {
            let copiedTempState = { ...this.state }
            copiedTempState.pizzas = response.data.pizzas
            copiedTempState.basePrice = response.data.basePrice
            this.setState(copiedTempState)
        })
        .catch(error => {console.log(error)})

        await axios.get("https://doclerlabs.github.io/mobile-native-challenge/ingredients.json")
        .then(response => {
            let copiedTempState = { ...this.state }
            copiedTempState.ingredients = response.data
            this.setState(copiedTempState)
        })
        .catch(error => {console.log(error)})

        let copiedTempState = { ...this.state }
        copiedTempState.ready = true
        this.setState(copiedTempState)

        console.log(this.state)
        
    }

    ingredientsLister(pizzaIngredientsList){
        let pizzaTempArray = []
        pizzaIngredientsList.forEach(element => {
            const result = this.state.ingredients.find(
                ({id}) => id=== element
            )
            console.log(result)
            pizzaTempArray.push(result)
            return result
        });
        //console.log(pizzaTempArray)

        let ingredientNameList = []
        pizzaTempArray.forEach(element => ingredientNameList.push(element.name))
        //console.log(ingredientNameList)
        const ingredientsString = ingredientNameList.join()

        let pizzaPrice = this.state.basePrice
        
        pizzaTempArray.forEach(element => pizzaPrice += element.price)
        console.log(pizzaPrice)

       return {ingredientNameList: ingredientsString,
                pizzaPrice: pizzaPrice}
    }

    pizzaDetailsCalculator(pizzaIngredientsList){
        const ingredientsNameList = []
        pizzaIngredientsList.ingredients.forEach(element => ingredientsNameList.push(element.name))
        console.log(ingredientsNameList)
        return ingredientsNameList
    }

        render() {
        //console.log(this.state)
        const pizzas = this.state.pizzas
               
        return (
            <div>                
                {
                this.state.ready ? 
                pizzas.map(
                pizza => <PizzaCard key={pizza.name}
                                name={pizza.name}
                                ingredients={this.ingredientsLister(pizza.ingredients)}
                                imageUrl={pizza.imageUrl} />
                ): <h1>Loading...</h1>
                }
            </div>
        )
    }
}

export default PizzasLister
