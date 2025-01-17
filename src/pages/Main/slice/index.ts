import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login } from './thunk'
import { User, UserState } from './types'
import { IRouterMeta } from 'routes/config'
export const initialState: UserState = {
  username: '',
  loginLoading: false,
  collapsed: false,
  storageMap: {},
  routeMeta: {},
}

const mainSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCollapsed(state) {
      state.collapsed = !state.collapsed
      sessionStorage.setItem('collapsed', state.collapsed ? 'true' : '') // 记录用户操作
    },
    updateUser(state, { payload }: PayloadAction<User>) {
      state.username = payload.username
    },
    updateStorage(state, { payload }: PayloadAction<User>) {
      state.storageMap = {
        ...state.storageMap,
        ...payload,
      }
    },
    updateRouteMeta(state, { payload }: PayloadAction<IRouterMeta>) {
      const collapsed = !!sessionStorage.getItem('collapsed')

      state.routeMeta = payload
      state.collapsed = collapsed || !!payload?.collapsed
    },
  },
  extraReducers: builder => {
    // login
    builder.addCase(login.pending, (state, action) => {
      state.loginLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginLoading = false
      state.username = action.payload.username
    })
  },
})

export const { actions: mainActions, reducer } = mainSlice
export default mainSlice.reducer
