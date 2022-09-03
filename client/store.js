import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import shopReducer from "./features/shopSlice";


export const store = configureStore({
    reducer: {
        basket: basketReducer,
        shop: shopReducer,
    },
});