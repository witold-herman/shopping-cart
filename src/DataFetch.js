import React, {useEffect, useState} from 'react'
import {ShoppingCart} from "./ShoppingCart";

export const DataFetch = () => {
    const [cartData, setCartData] = useState([]);
    const [productsData, setProductsData] = useState([]);

    // Getting data from cart_products JSON file and sets cartData hook
    const getCart = async () => {
        await fetch('cart_products.json'
            , {
                headers: {
                    'Content-Type': 'application.json',
                    'Accept': 'application.json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setCartData(myJson)
            })
    };

    // Getting data from products JSON file and sets productsData hook
    const getProducts = () => {
        fetch('products.json'
            , {
                headers: {
                    'Content-Type': 'application.json',
                    'Accept': 'application.json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (productsJSON) {
                setProductsData(productsJSON)
            });
    };

    useEffect(() => {
        getCart();
        getProducts();
    }, []);

    return (
        <>
            <ShoppingCart cartData={cartData} productsData={productsData}/>
        </>
    )
};