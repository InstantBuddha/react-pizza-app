import React, { Component } from 'react'
import PizzaToppingCard from './PizzaToppingCard'

class CustomizePizza extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
  render() {
    console.log(this.props.pizzaData)
    return <div>
        <h1>{this.props.pizzaData.name}</h1>
        <h2>Base Price: {this.props.basePrice}</h2>
        {this.props.pizzaData.uniqueIngredientsList.map(
          ingredient => <PizzaToppingCard 
                            key={ingredient.name}
                            name={ingredient.name}
                            price={ingredient.price}
                            isAdded={ingredient.isAdded}
          />
        )}
    </div>
  }
}

export default CustomizePizza