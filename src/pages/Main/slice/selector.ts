import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'
import { initialState } from '.'

export const userSelector = (state: RootState) => state.user || initialState
export const selectDomain = (state: RootState) => state.user || initialState

export const selectCollapsed = createSelector(
  [selectDomain],
  state => state.collapsed,
)

export const selectStorage = createSelector(
  [selectDomain],
  state => state.storageMap,
)

export const selectRouteMeta = createSelector(
  [selectDomain],
  state => state.routeMeta,
)

export const selectUsername = createSelector(
  [selectDomain],
  state => state.username,
)
