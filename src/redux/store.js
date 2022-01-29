import { configureStore } from "@reduxjs/toolkit";
import dashboard from "./reducers/dashboard";

export const store = configureStore({
    reducer: {
        dashboard: dashboard,
    },
});
