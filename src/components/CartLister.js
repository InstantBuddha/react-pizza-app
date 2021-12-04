import React, { Component } from 'react'
import CartCard from './CartCard'

class CartLister extends Component {
    constructor(props) {
        super(props)
    
        this.state = {...props}

        this.cartListCreator = this.cartListCreator.bind(this)
    }
    
    cartListCreator(objectToTransform){
        return objectToTransform.pizzas.map(
            (pizza, uniqueId) => {
                return {
                    name : pizza.name,
                    price : pizza.price,
                    uniqueId: ("p"+uniqueId)
                }
            }
        ).concat(
            objectToTransform.drinks.map(
                (drink, uniqueId) => {
                    return {
                        name : drink.name,
                        price : drink.price,
                        uniqueId : ("d"+uniqueId)
                    }
                }
            )
        )
    }
    
    render() {
        const cartFullList = this.cartListCreator(this.state.inCartList)
        const bootstrapCss = "d-flex flex-column align-items-center"
        
        console.log(cartFullList)
        return (
            <div >
                <div>
                    <h2>Your Cart</h2>
                </div>
                <div className={bootstrapCss} >
                    {cartFullList.map(
                        cartItem => <CartCard 
                        name = {cartItem.name}
                        price = {cartItem.price}
                        key = {cartItem.uniqueId} />
                    )}
                </div>
            </div>
        )
    }
}

export default CartLister
