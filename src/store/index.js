import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./apis/userApi";

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({serializableCheck: false}).concat(userApi.middleware)
    }
})

setupListeners(store.dispatch);

export { useFetchUsersQuery, useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation } from "./apis/userApi";