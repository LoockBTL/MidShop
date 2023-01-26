import { LoginData, RegisterData } from '@/types/user-types'
import $axios from '@/utils/axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'

type Error = {
  message: string
}
interface UserState {
  status?: string
  access_token: string
  refresh_token: string
  registration?: string
}

export const loginCallApi = createAsyncThunk<
  UserState,
  LoginData,
  { rejectValue: Error }
>('users/loginCallApi', async (data: LoginData, thunkApi) => {
  const response: AxiosResponse<UserState> = await $axios.post(
    '/auth/login',
    data
  )
  if (response.status !== 201) {
    return thunkApi.rejectWithValue({
      message: 'Failde to login',
    })
  }
  return response.data
})

const initialState: UserState = {
  status: '',
  access_token: '',
  refresh_token: '',
  registration: '',
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = ''
      state.access_token = ''
      state.refresh_token = ''
    },
    register: (state, action: PayloadAction<RegisterData>) => {
      state.registration = 'Success'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginCallApi.pending, (state) => {
        state.status = 'Loading'
      })
      .addCase(loginCallApi.fulfilled, (state, { payload }) => {
        state.status = 'Login'
        state.access_token = payload.access_token
        state.refresh_token = payload.refresh_token
      })
      .addCase(loginCallApi.rejected, (state, { payload }) => {
        state.status = payload?.message || 'Error'
      })
  },
})

export const { reducer: userReducer, actions: userActions } = userSlice
