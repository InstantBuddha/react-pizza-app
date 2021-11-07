import React, { Component } from 'react'
import PizzasLister from './PizzasLister'

class MainWrapper extends Component {
    constructor(props){
        super(props)

        this.state = {
            whatToShow: "pizzas"
        }
    }



    render() {
        return (
            <div>
                <PizzasLister />
            </div>
        )
    }
}

export default MainWrapper
