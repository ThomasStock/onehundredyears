import { Dayjs } from 'dayjs'
import pickParents from './events/data/pickParents'
import { EventData } from './events/types'
import { generateEvent } from './events/utils'

interface State {
	birthDate: Dayjs
	date: Dayjs
	running: boolean
	events: EventData[]
}

export const init = (birthDate: Dayjs): State => {
	return {
		birthDate,
		date: birthDate,
		running: false,
		events: [generateEvent(birthDate, pickParents)],
	}
}

export const reducer = (state: State, action: { type: string; payload?: any }): State => {
	switch (action.type) {
		case 'start':
			return { ...state, running: true }
		case 'stop':
			return { ...state, running: false }
		case 'progress':
			return { ...state, date: action.payload }
		case 'newEvent':
			return { ...state, events: [...state.events, action.payload] }
		case 'reset':
			return init(action.payload)
		default:
			throw new Error()
	}
}
