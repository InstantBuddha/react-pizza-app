import React, { Component } from 'react'
import PizzaToppingCard from './PizzaToppingCard'

class CustomizePizza extends Component {
  constructor(props) {
    super(props)

    this.state = {
      originalIngredientsList: this.props.uniqueIngredientsList,
      uniqueIngredientsList: this.props.uniqueIngredientsList,
      fullPrice: this.props.fullPrice,
      basePrice: this.props.basePrice,
      originalName: this.props.pizzaName,
      customized: false
    }

    this.toppingAddedSwitcher = this.toppingAddedSwitcher.bind(this)
    this.fullPriceUpdater = this.fullPriceUpdater.bind(this)
    this.checkBoxClicked = this.checkBoxClicked.bind(this)
    this.pizzaNameChanger = this.pizzaNameChanger.bind(this)
  }

  toppingAddedSwitcher(toppingID) {
    let copiedTempState = { ...this.state }
    if(!copiedTempState.customized){
      copiedTempState.customized = true
    }
    copiedTempState.pizzaName = this.pizzaNameChanger(copiedTempState.originalName)
    copiedTempState.uniqueIngredientsList.map(topping => {
      if (topping.id === toppingID) { topping.isAdded = !topping.isAdded }
    })
    this.setState(copiedTempState)

  }

  pizzaNameChanger(originalName){
    return "Custom " + originalName
  }

  fullPriceUpdater(basePrice, uniqueIngredientsList) {
    let copiedTempState = { ...this.state }
    let newFullPrice = uniqueIngredientsList.reduce((fullPrice, ingredientObject) => {
      let toAdd = ingredientObject.isAdded ? ingredientObject.price : 0
      return fullPrice + toAdd
    }, basePrice)
    copiedTempState.fullPrice = newFullPrice
    this.setState(copiedTempState)
  }

  checkBoxClicked(toppingID){
    this.toppingAddedSwitcher(toppingID)
    this.fullPriceUpdater(this.state.basePrice, this.state.uniqueIngredientsList)
  }

  render() {
    const bootstrapCss = "d-flex flex-column align-items-center"

    return <div>
      <h1>{this.state.pizzaName ? this.state.pizzaName : this.state.originalName}</h1>
      <h2>Full Price: {this.state.fullPrice}</h2>
      <div className={bootstrapCss}>
        {this.props.uniqueIngredientsList.map(
          ingredient => <PizzaToppingCard
            key={ingredient.id}
            name={ingredient.name}
            ingredientID={ingredient.id}
            price={ingredient.price}
            isAdded={ingredient.isAdded}
            checkBoxClicked={this.checkBoxClicked}
          />
        )}
      </div>
      <button onClick={() => this.props.cartAdder({
        name: this.state.pizzaName,
        originalName: this.state.originalName,
        price: this.state.fullPrice,
        uniqueId: 99
      })}
        className="btn btn-success btn-lg btn-block w-100" >Buy this pizza!</button>

    </div>
  }
}

export default CustomizePizza