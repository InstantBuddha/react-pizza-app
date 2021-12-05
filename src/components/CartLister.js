import React, { Component } from 'react'
import CartCard from './CartCard'
import FullPrice from './FullPrice'

class CartLister extends Component {
    constructor(props) {
        super(props)
    
        this.state = {...props}

        this.cartListCreator = this.cartListCreator.bind(this)
        this.cartItemRemover = this.cartItemRemover.bind(this)
        this.totalPriceCalculator = this.totalPriceCalculator.bind(this)
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

    cartItemRemover(itemId){
        this.props.cartItemRemover(itemId)
    }

    totalPriceCalculator(itemsArray){
        return itemsArray.map( item => {
            return item.price
        }).reduce( (total, currentprice) =>  total + currentprice ,0)
    }
    
    render() {
        const cartFullList = this.cartListCreator(this.state.inCartList)
        const bootstrapCss = "d-flex flex-column align-items-center"
        
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
                        key = {cartItem.uniqueId}
                        uniqueId = {cartItem.uniqueId}
                        cartItemRemover={this.cartItemRemover} />
                    )}
                </div>
                <div className={bootstrapCss} >
                        <FullPrice fullPrice={this.totalPriceCalculator(cartFullList)} />
                </div>
                <div>
                    {cartFullList.length > 0 &&
                        <button>Order</button>
                    }
                    
                </div>
            </div>
        )
    }
}

export default CartLister
