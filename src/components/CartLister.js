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
                <div className={bootstrapCss}>
                    <div className={"w-25 m-1 container "}>
                    {cartFullList.length > 0 &&
                        <button className="btn btn-success btn-lg btn-block w-100"
                                onClick={this.props.proceedToCheckout}
                                >Order</button>
                    }
                    </div>
                    
                    
                </div>
            </div>
        )
    }
}

export default CartLister
