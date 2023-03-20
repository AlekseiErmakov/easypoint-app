import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './MainPage';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {authReducer} from "./view/login/reducer";
import {employeeApi} from "./api/employee";
import {pointApi, pointTypeApi} from "./api/point";
import {totalStationApi} from "./api/totalStation";
import {areaStructureApi} from "./api/areaStructure";
import {areaStructureTypeApi} from "./api/areaStructureType";
import {adminStructureTypeApi} from "./api/adminStructureType";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        [pointApi.reducerPath]: pointApi.reducer,
        [pointTypeApi.reducerPath]: pointTypeApi.reducer,
        [totalStationApi.reducerPath]: totalStationApi.reducer,
        [areaStructureApi.reducerPath]: areaStructureApi.reducer,
        [areaStructureTypeApi.reducerPath]: areaStructureTypeApi.reducer,
        [adminStructureTypeApi.reducerPath]: adminStructureTypeApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(employeeApi.middleware, pointApi.middleware,
        pointTypeApi.middleware, totalStationApi.middleware, areaStructureApi.middleware, areaStructureTypeApi.middleware, adminStructureTypeApi.middleware)
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
const App = () => {
    return (
        <Provider store={store}>
            <React.StrictMode>
                <BrowserRouter>
                    <MainPage/>
                </BrowserRouter>
            </React.StrictMode>
        </Provider>
    )
};

root.render(
    <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
