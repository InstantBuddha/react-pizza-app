import React, { Component } from 'react'
import CartCard from './CartCard'

class CartLister extends Component {
    constructor(props) {
        super(props)
    
        this.state = {...props}

        this.cartListCreator = this.cartListCreator.bind(this)
    }
    
    cartListCreator(objectToTransform){
        return objectToTransform.map(
            item => {
                return {
                    name : item.name,
                    price : item.price
                }
            }
        )
    }
    
    render() {
        const cartFullList = this.cartListCreator(this.state.inCartList.pizzas)
            .concat(this.cartListCreator(this.state.inCartList.drinks))
        
        console.log(cartFullList)
        return (
            <div>
                <div>
                    <h1>Cart</h1>
                </div>
                <div>
                    {cartFullList.map(
                        cartItem => <CartCard 
                        name = {cartItem.name}
                        price = {cartItem.price} />
                    )}
                </div>
            </div>
        )
    }
}

export default CartLister
