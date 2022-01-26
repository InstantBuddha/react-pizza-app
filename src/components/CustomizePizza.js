import React, { Component } from 'react'
import PizzaToppingCard from './PizzaToppingCard'

class CustomizePizza extends Component {
  constructor(props) {
    super(props)

    this.state = {
      originalIngredientsList: this.props.pizzaData.uniqueIngredientsList,
      uniqueIngredientsList: this.props.pizzaData.uniqueIngredientsList
    }

    this.toppingAddedSwitcher = this.toppingAddedSwitcher.bind(this)
  }

  toppingAddedSwitcher(toppingID){
      let copiedTempState = { ...this.state }
      copiedTempState.uniqueIngredientsList.map(topping => {
        if(topping.id===toppingID){topping.isAdded = !topping.isAdded}
      })
      this.setState(copiedTempState)
      
  }

  render() {
    console.log(this.props.pizzaData)
    const bootstrapCss = "d-flex flex-column align-items-center"


    return <div>
      <h1>{this.props.pizzaData.name}</h1>
      <h2>Base Price: {this.props.basePrice}</h2>
      <div className={bootstrapCss}>
        {this.props.pizzaData.uniqueIngredientsList.map(
          ingredient => <PizzaToppingCard
            key={ingredient.id}
            name={ingredient.name}
            ingredientID={ingredient.id}
            price={ingredient.price}
            isAdded={ingredient.isAdded}
            toppingAddedSwitcher={this.toppingAddedSwitcher}
          />
        )}
      </div>
      <button onClick={()=>this.props.cartAdder({name: "testPizza",
                                                price: 10,
                                                uniqueId: 99    })}     
      className="btn btn-success btn-lg btn-block w-100" >Buy this pizza!</button>

    </div>
  }
}

export default CustomizePizza