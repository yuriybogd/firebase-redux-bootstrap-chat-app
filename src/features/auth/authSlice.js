import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getFirebase } from 'react-redux-firebase'

import { nanoid } from 'nanoid'

const initialState = {
  loginStatus: 'idle',
  registerStatus: 'idle',
  loginError: undefined,
  registerError: undefined,
}

// Async Thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
      await getFirebase().auth().signInWithEmailAndPassword(email, password)
    } catch ({ code, message }) {
      console.log(code, message)
      return rejectWithValue({ code, message, id: nanoid() })
    }
  },
)

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    const firebase = getFirebase()
    const firestore = firebase.firestore()
    const { rejectWithValue } = thunkAPI

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      await firestore.collection('users').doc(response.user?.uid).set({
        name,
      })
    } catch ({ code, message }) {
      return rejectWithValue({ code, message, id: nanoid() })
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loginStatus = 'pending'
    })
    builder.addCase(login.fulfilled, (state) => {
      state.loginStatus = 'idle'
      state.loginError = undefined
    })
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loginStatus = 'idle'
      state.loginError = payload
    })
    builder.addCase(register.pending, (state) => {
      state.registerStatus = 'pending'
    })
    builder.addCase(register.fulfilled, (state) => {
      state.registerStatus = 'idle'
      state.registerError = undefined
    })
    builder.addCase(register.rejected, (state, { payload }) => {
      state.registerStatus = 'idle'
      state.registerError = payload
    })
  },
})

// Selectors
export const selectAuthLoginStatus = (state) => state.auth.loginStatus
export const selectAuthLoginError = (state) => state.auth.loginError
export const selectAuthRegisterStatus = (state) => state.auth.registerStatus
export const selectAuthRegisterError = (state) => state.auth.registerError
export const selectAuthFirebaseState = (state) => state => state.firebase.auth
export const selectProfile = (state) => state.firebase.profile

export default authSlice.reducer
