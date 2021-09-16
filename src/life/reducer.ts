import { Dayjs } from 'dayjs'
import { Parent } from './events/data/pickParents'
import { getEventConfig } from './events/registry'
import { EventConfig, EventDate } from './events/types'
import { generateEvent } from './events/utils'

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

export const init = (birthDate: Dayjs): State => {
	return {
		birthDate,
		date: birthDate,
		running: false,
		events: [generateEvent(birthDate, getEventConfig('pickParents') as EventConfig)],
		family: {},
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
