import React, {useState, useEffect} from 'react';
import {Checkout} from "./Checkout";
import "./CSS/cart.css"

export const ShoppingCart = (props) => {
    const [productsList, setProductsList] = useState([]);
    const [childrenProductsList, setChildrenProductsList] = useState([]);

    // Adding quantity to desired product object and setting it in hook
    const onSpinnerPlusClick = (index) => {
        const newArr = [...productsList];
        newArr[index.target.id] = {
            id: `${productsList[index.target.id].id}`,
            name: `${productsList[index.target.id].name}`,
            image: `${productsList[index.target.id].image}`,
            price: productsList[index.target.id].price,
            quantity: +productsList[index.target.id].quantity + 1
        };
        setProductsList(newArr);
    };

    // Subtracting quantity from desired product object and setting it in hook
    const onSpinnerMinusClick = (index) => {
        if (productsList[index.target.id].quantity > 0) {
            const newArr = [...productsList];
            newArr[index.target.id] = {
                id: `${productsList[index.target.id].id}`,
                name: `${productsList[index.target.id].name}`,
                image: `${productsList[index.target.id].image}`,
                price: productsList[index.target.id].price,
                quantity: +productsList[index.target.id].quantity - 1
            };
            setProductsList(newArr);
        }
    };

    // Removing item from productsList and childrenProductsList
    const removeItem = (e) => {
        let delArray = [...productsList];
        delArray.splice(e.target.id, 1);
        setProductsList(delArray);
        setChildrenProductsList(delArray);
    };

    // Updating whole cart quantity
    const updateProductsQuantity = () => {
        setChildrenProductsList(productsList);
    };

    // Updating quantity of desired item in cart
    const updateProductQuantity = (e) => {
        const newArr = [...childrenProductsList];
        newArr[e.target.id] = {
            id: `${productsList[e.target.id].id}`,
            name: `${productsList[e.target.id].name}`,
            image: `${productsList[e.target.id].image}`,
            price: productsList[e.target.id].price,
            quantity: +productsList[e.target.id].quantity
        };
        setChildrenProductsList(newArr);
    };

    // Callback that clears cart when it's submitted in children component
    const parentSubmitCallback = () => {
      setProductsList([]);
      setChildrenProductsList([]);
    };

    // Get's data from parent and checking which of all products are in cart
    const checkCart = () => {
        let tempArr = []
        props.cartData.forEach(cartElement => {
            props.productsData.forEach(product => {
                if (cartElement.productId === product.id) {
                    let newObj = {
                        id: `${product.id}`,
                        name: `${product.name}`,
                        image: `${product.image}`,
                        price: product.price,
                        quantity: `${cartElement.quantity}`
                    };
                    tempArr.push(newObj)
                }
            })
        });
        setProductsList(productsList.concat(tempArr));
        setChildrenProductsList(productsList.concat(tempArr))
    };

    useEffect(() => {
        checkCart();
    }, [props.cartData, props.productsData]);

    return (
        <>
            {productsList.length !== 0 &&
            <div className="cart-container">
                <div className="cart-container2">
                    <div className="cart-header">Shopping Cart</div>
                    <div className="cart">
                        <table className="cart-table">
                            <colgroup>
                                <col className="col-1"/>
                                <col className="col-2"/>
                                <col className="col-3"/>
                                <col className="col-4"/>
                                <col className="col-5"/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Product Name</th>
                                <th>Unit Price</th>
                                <th>Qty</th>
                            </tr>
                            {
                                productsList.map((e, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                <input alt="Not found" type="image"
                                                       id={`${index}`} src={process.env.PUBLIC_URL + `x-img.png`}
                                                       onClick={removeItem}/>
                                            </td>
                                            <td>
                                                <img alt={"Not found"}
                                                     src={process.env.PUBLIC_URL + `${e.image}`}/>
                                            </td>
                                            <td>{e.name}</td>
                                            <td>{"$" + e.price.toFixed(2)}</td>
                                            <td>
                                                <div className="spinner">
                                                    <button id={index} className="spinner-button"
                                                            onClick={onSpinnerMinusClick}>-
                                                    </button>
                                                    <output id={e.id} type="text"
                                                            className="spinner-output">{e.quantity}</output>
                                                    <button id={index} className="spinner-button"
                                                            onClick={onSpinnerPlusClick}>+</button>
                                                    <input type="image" alt="Not found"
                                                           src={process.env.PUBLIC_URL + `edit-img.png`} id={index}
                                                           onClick={updateProductQuantity}/>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        <div className="footer">
                            <button onClick={updateProductsQuantity} className="button">Update Shopping Cart</button>
                        </div>
                    </div>
                </div>
                <Checkout productsList={childrenProductsList} submitCallback={parentSubmitCallback}/>
            </div>
            }
            {productsList.length === 0  &&
            <div className="empty-cart">
                Cart is empty
            </div>
        }
        </>
    )
};