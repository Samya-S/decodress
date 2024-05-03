import { createSlice } from "@reduxjs/toolkit"

// define schema for products
// {
//     itemCode: 1,
//     name: 'Product 1',
//     price: 100,
//     quantity: 1,
//     size: 'XL',
//     color: 'Blue'
// }

const initialState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {
    products: [
        { itemCode: 1, name: 'Tshirt - Wear the code Lorem ipsum dolor sit amet.', price: 100, quantity: 1 },
        { itemCode: 2, name: 'Product 2', price: 200, quantity: 1 },
        { itemCode: 3, name: 'Product 3', price: 300, quantity: 1 },
        { itemCode: 4, name: 'Product 4', price: 400, quantity: 1 },
    ],
    subtotal: 1000
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const productExists = state.products.some(product => product.itemCode === action.payload.itemCode);

            if (productExists) {
                state.products = state.products.map(product =>
                    product.itemCode === action.payload.itemCode
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                );
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
            }

            state.subtotal += action.payload.price;
        },
        removeFromCart: (state, action) => {
            const product = state.products.find(product => product.itemCode === action.payload.itemCode);

            if (product.quantity > 1) {
                state.products = state.products.map(product =>
                    product.itemCode === action.payload.itemCode
                        ? { ...product, quantity: product.quantity - 1 }
                        : product
                );
            } else {
                state.products = state.products.filter(product => product.itemCode !== action.payload.itemCode);
            }

            state.subtotal -= action.payload.price;
        },
        increaseQuantity: (state, action) => {
            state.products = state.products.map(product => {
                if (product.itemCode === action.payload.itemCode) {
                    state.subtotal += action.payload.price;
                    return { ...product, quantity: product.quantity + 1 }
                }
                return product
            })
        },
        decreaseQuantity: (state, action) => {
            const product = state.products.find(product => product.itemCode === action.payload.itemCode);

            if (product.quantity > 1) {
                state.products = state.products.map(product =>
                    product.itemCode === action.payload.itemCode
                        ? { ...product, quantity: product.quantity - 1 } 
                        : product
                );
            } 
            else {
                state.products = state.products.filter(product => product.itemCode !== action.payload.itemCode);
                state.subtotal -= action.payload.price;
            }
            state.subtotal = state.products.reduce((total, product) => total + product.price * product.quantity, 0);
        },
        clearCart: (state) => {
            state.products = []
            state.subtotal = 0
        }
    }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer