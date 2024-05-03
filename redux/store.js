import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart";

function loadState() {
    try {
        const serializedState = (typeof window !== 'undefined') ? localStorage.getItem('state') : null;
        // const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

function saveState(state) {
    try {
        const serializedState = JSON.stringify(state);
        if (typeof window !== 'undefined') {
            localStorage.setItem('state', serializedState);
        }
    } catch {
        // ignore write errors
    }
}

const store = configureStore({
    reducer: {
        cart: cartReducer
    },
    preloadedState: loadState()
});

store.subscribe(() => {
    saveState({
        cart: store.getState().cart
    });
});

export const makeStore = () => {
    return store;
}