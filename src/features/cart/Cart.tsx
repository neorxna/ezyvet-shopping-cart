import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CartLines, selectCartItems, updateQuantity } from './cartSlice';
import { ProductItemList, selectProducts } from '../products/productsSlice'
import { Link } from '@material-ui/core';


function CartItem(props: { name: string, quantity: number }) {
    const { name, quantity } = props;
    const dispatch = useDispatch();

    const removeLink = <Link
        component="button"
        variant="body2"
        onClick={() => { dispatch(updateQuantity({ name, quantity: 0 - quantity })) }}
    >remove</Link>;

    const products: ProductItemList = useSelector(selectProducts)
    const thisProduct = products.filter(product => product.name === name)[0]
    const price = thisProduct.price
    const total: string = (price * quantity).toFixed(2)
    return <li>{name} x{quantity} ${total} (${price.toFixed(2)} each) {removeLink} </li>;
}

export function Cart() {
    const cartItems: CartLines = useSelector(selectCartItems);

    return cartItems.length === 0 ? <div>nothing in cart yet</div> :
        <ul>
            {Object.entries(cartItems).map(([name, _]) => <CartItem name={name} quantity={cartItems[name]} />)}
        </ul>;
}