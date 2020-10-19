import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CartLines, selectCartItems, updateQuantity, clearCart } from './cartSlice';
import { ProductItemList, selectProducts } from '../products/productsSlice'
import { Link, Card } from '@material-ui/core';
import styled from 'styled-components';
import './Cart.css'

const ShoppingCartCard = styled(Card)`margin: 1em; padding: 2em;`

const productPrice = (name: string, products: ProductItemList) => {
    const thisProduct = products.filter(product => product.name === name)[0]
    return thisProduct.price
}

function CartItem(props: { name: string, quantity: number }) {
    const { name, quantity } = props;
    const dispatch = useDispatch();

    const removeLink = <Link
        component="button"
        variant="body2"
        onClick={() => { dispatch(updateQuantity({ name, quantity: 0 - quantity })) }}
    >remove</Link>;

    const products: ProductItemList = useSelector(selectProducts)
    const price = productPrice(name, products)
    const totalText: string = (price * quantity).toFixed(2)
    const priceText: string = price.toFixed(2)

    return <ShoppingCartCard>
        {name} x{quantity} ${totalText} ({priceText} each) {removeLink}
    </ShoppingCartCard>
}

function CartFooter() {
    const dispatch = useDispatch();
    const cartItems: CartLines = useSelector(selectCartItems);
    const products: ProductItemList = useSelector(selectProducts);

    const clearCartLink = <Link
        component="button"
        variant="body2"
        onClick={() => { dispatch(clearCart()) }}
    >clear cart</Link>;

    const totalQuantity = Object.entries(cartItems).reduce(
        (grandTotal: number, [name, quantity]) => grandTotal + quantity, 0
    )

    const totalPriceSum = Object.entries(cartItems).reduce(
        (grandTotal: number, [name, quantity]) => {
            const price = productPrice(name, products);
            const total = price * quantity;
            return grandTotal + total
        }, 0)

    const totalQuantityText: string = `${totalQuantity}` || 'none'
    const grandTotalPriceText: string = totalPriceSum.toFixed(2)
    const pl: boolean = totalQuantity > 1 || totalQuantity === 0

    return <>
        {totalQuantityText} thing{pl ? 's' : ''} in the cart (${grandTotalPriceText} total)
        {totalQuantity > 0 && clearCartLink}
    </>

}

export function Cart() {
    const cartItems: CartLines = useSelector(selectCartItems);

    return cartItems.length === 0 ? <div>nothing in cart yet</div> :
        <>
            <ul>
                {Object.entries(cartItems).map(([name, _]) => <CartItem name={name} quantity={cartItems[name]} />)}
            </ul>
            <CartFooter />
        </>;
}