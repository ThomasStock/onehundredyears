import { Dayjs } from 'dayjs'
import React from 'react'

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
	description: string | React.FunctionComponent
	chance: number
	age: EventAge
	choices: ChoiceData[]
}

export interface EventData {
	key: string
	date: Dayjs
}
