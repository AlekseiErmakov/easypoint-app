import { bindActionCreators, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../index'
import { type Employee } from '../employee'

export interface User {
  username: string
  token: string

  employee: Employee
}

export interface AuthenticationState {
  authenticated: boolean
  user?: User
}

const initialState: AuthenticationState = {
  authenticated: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate (state, action: PayloadAction<User>) {
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
