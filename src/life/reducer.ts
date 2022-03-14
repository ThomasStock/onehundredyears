import dayjs from 'dayjs'
import { Parent } from './events/data/pickParents'
import { EventConfig, EventDate } from './events/types'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { generateEvent } from './events/utils'
import { getEventConfig } from './events/registry'

import './events/registerEvents'

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
	birthDateTicks: number
	dateTicks: number
	running: boolean
	events: EventDate[]
	family: Family
}

const birthDateTicks = dayjs().valueOf()
console.log('getting events', getEventConfig('pickParents'))
const pickParents = generateEvent(birthDateTicks, getEventConfig('pickParents') as EventConfig)

const initialState: State = {
	birthDateTicks,
	dateTicks: birthDateTicks,
	running: false,
	events: [pickParents],
	family: {} as Family,
}

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
		progress: (state, action: PayloadAction<number>) => {
			state.dateTicks = action.payload
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
