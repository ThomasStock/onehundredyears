import { Dayjs } from 'dayjs'

interface EventAge {
	min?: number
	max?: number
}

interface ChoiceData {
	key: string
	description: string
	onSelect: () => void
}

export interface EventConfig {
	key: string
	title: string
	chance: number
	age: EventAge
	choices: ChoiceData[]
}

export interface EventData {
	key: string
	date: Dayjs
}
