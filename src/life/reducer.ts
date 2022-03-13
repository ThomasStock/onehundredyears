import dayjs, { Dayjs } from 'dayjs'
import { Parent } from './events/data/pickParents'
import { getEventConfig } from './events/registry'
import { EventConfig, EventDate } from './events/types'
import { generateEvent } from './events/utils'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface Stats {
	wealth?: number
	love?: number
	intelligence?: number
}
interface Family {
	dad?: Parent
	mom?: Parent
}
interface State {
	birthDate: Dayjs
	date: Dayjs
	running: boolean
	events: EventDate[]
	family: Family
}

const birthDate = dayjs()

const initialState: State = {
	birthDate,
	date: birthDate,
	running: false,
	events: [],
	family: {} as Family,
}

// export const born = (birthDate: Dayjs): State => {
// 	return {
// 		birthDate,
// 		date: birthDate,
// 		running: false,
// 		events: [generateEvent(birthDate, getEventConfig('pickParents') as EventConfig)],
// 		family: {},
// 	}
// }

// type Action<T = undefined> = {
// 	type: string
// 	payload?: T
// }

// const action =
// 	<T = undefined>(type: string) =>
// 	(payload: T): Action<T> => ({
// 		type,
// 		payload,
// 	})

// export const addFamily = action<Partial<Family>>('addFamily')
// export const progress = action<Dayjs>('progress')

//export const newReducer = createReducer(state)

// const reducer = (state: State, action: Action): State => {
// 	switch (action.type) {
// 		case 'start':
// 			return { ...state, running: true }
// 		case 'stop':
// 			return { ...state, running: false }
// 		case 'progress':
// 			return { ...state, date: action.payload }
// 		case 'newEvent':
// 			return { ...state, events: [...state.events, action.payload] }
// 		case 'addFamily':
// 			return { ...state, family: { ...action.payload } }
// 		case 'reset':
// 			return init(action.payload)
// 		default:
// 			throw new Error()
// 	}
// }

export const lifeSlice = createSlice({
	name: 'life',
	initialState,
	reducers: {
		start: (state) => {
			state.running = true
		},
		stop: (state) => {
			state.running = false
		},
		progress: (state, action: PayloadAction<Dayjs>) => {
			state.date = action.payload
		},
		newEvent: (state, action: PayloadAction<EventDate>) => {
			state.events = [...state.events, action.payload]
		},
		addFamily: (state, action: PayloadAction<Family>) => {
			state.family = action.payload
		},
	},
})

export const lifeActions = lifeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLife = (state: RootState) => state.life

export default lifeSlice.reducer
