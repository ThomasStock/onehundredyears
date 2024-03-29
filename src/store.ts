import { configureStore } from '@reduxjs/toolkit'

import lifeReducer from './life/reducer'

export const store = configureStore({
	reducer: {
		life: lifeReducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
