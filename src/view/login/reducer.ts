import {bindActionCreators, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootState} from "../../index";
import {IEmployee} from "../employee";

export interface IUser {
    username: string;
    token: string;

    employee: IEmployee
}


export interface AuthenticationState {
    authenticated: boolean
    user?: IUser;
}

const initialState: AuthenticationState = {
    authenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate(state, action: PayloadAction<IUser>) {
            return {
                authenticated: true,
                user: action.payload
            }
        }
    }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
const actions = {
    ...authActions
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}

