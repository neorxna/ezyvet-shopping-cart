import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectProducts,
    populateAsync,
    ProductItem,
    ProductItemList
} from './productsSlice';
import { updateQuantity } from '../cart/cartSlice'

import { Link } from '@material-ui/core';

export function ProductItemView(props: ProductItem) {
    const dispatch = useDispatch();
    const { name, price } = props;
    const link = <Link
        component="button"
        variant="body2"
        onClick={() => { dispatch(updateQuantity({ name, quantity: 1 })) }}
    >
        {name}
    </Link>
    return <li>{link} ${price}</li>
}

export function Products() {
    const items: ProductItemList = useSelector(selectProducts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(populateAsync())
    }, [])

    return items.length === 0 ? <div>loading products...</div> : <ul>{items.map(item => <ProductItemView {...item} />)}</ul>
}