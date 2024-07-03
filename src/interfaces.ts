import React, {SetStateAction} from "react"

export interface IProduct{
    id: string,
    title: string,
    price: number,
    description: string,
    image: string,
}

export interface ICartItem extends IProduct {
    quantity: number
}

export interface ICartContext{
    cartItems: ICartItem [],
    setCartItems: React.Dispatch<SetStateAction<ICartItem[]>> 
}