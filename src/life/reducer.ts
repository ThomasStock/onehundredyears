import { Dayjs } from 'dayjs'
import createPickParents from './events/data/pickParents'
import { Parent } from './events/data/pickParents'
import { EventDate } from './events/types'
import { generateEvent } from './events/utils'

interface Family {
	dad: Parent | undefined
	mom: Parent | undefined
}
interface State {
	birthDate: Dayjs
	date: Dayjs
	running: boolean
	events: EventDate[]
	family: Family
}

export const init = (birthDate: Dayjs): State => {
	return {
		birthDate,
		date: birthDate,
		running: false,
		events: [generateEvent(birthDate, createPickParents())],
		family: { dad: undefined, mom: undefined },
	}
}

export type AddFamiliyAction = { type: 'addFamily'; payload: Partial<Family> }

export const reducer = (state: State, action: AddFamiliyAction | { type: string; payload?: any }): State => {
	switch (action.type) {
		case 'start':
			return { ...state, running: true }
		case 'stop':
			return { ...state, running: false }
		case 'progress':
			return { ...state, date: action.payload }
		case 'newEvent':
			return { ...state, events: [...state.events, action.payload] }
		case 'addFamily':
			return { ...state, family: { ...action.payload } }
		case 'reset':
			return init(action.payload)
		default:
			throw new Error()
	}
}
