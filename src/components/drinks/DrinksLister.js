import React, { Component } from 'react'
import axios from 'axios'
import DrinkCard from './DrinkCard'

class DrinksLister extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             drinks: [],
             ready: false
        }

        this.addToCart = this.addToCart.bind(this)
    }

    componentDidMount(){
        axios.get("https://doclerlabs.github.io/mobile-native-challenge/drinks.json")
        .then(response => {
            this.setState({drinks: response.data,
                            ready: true})
        })
    }

    addToCart(addedDrink){
        this.props.addToCart(addedDrink, "drink")
    }
    
    render() {
        const drinks = this.state.drinks
        const bootstrapCss = "d-flex flex-column align-items-center"

        return (
            <div className={bootstrapCss}>
                {
                    this.state.ready ?
                    drinks.map(
                        drink => <DrinkCard 
                            key={drink.id}
                            drink={drink}
                            addToCart={this.addToCart} />
                    ) : <i className="fa fa-spinner fa-spin"></i>
                }
            </div>
        )
    }
}

export default DrinksLister
