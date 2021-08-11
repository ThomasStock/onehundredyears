import { Dayjs } from 'dayjs'
import { getNewEvent } from './events'

interface State {
	birthDate: Dayjs
	date: Dayjs
	running: boolean
	events: Dayjs[]
}

export const init = (date: Dayjs): State => ({
	birthDate: date,
	date,
	running: false,
	events: [getNewEvent(date)],
})

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
