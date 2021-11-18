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
    }

    componentDidMount(){
        axios.get("https://doclerlabs.github.io/mobile-native-challenge/drinks.json")
        .then(response => {
            this.setState({drinks: response.data,
                            ready: true})
        })
    }
    
    render() {
        const drinks = this.state.drinks
        const bootstrapCss = "d-flex flex-column align-items-center"

        console.log(this.state)
        return (
            <div className={bootstrapCss}>
                {
                    this.state.ready ?
                    drinks.map(
                        drink => <DrinkCard 
                            key={drink.name}
                            name={drink.name}
                            price={drink.price}
                            drinkId={drink.id} />
                    ) : <i className="fa fa-spinner fa-spin"></i>
                }
            </div>
        )
    }
}

export default DrinksLister
