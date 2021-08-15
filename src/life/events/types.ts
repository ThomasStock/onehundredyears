import { Dayjs } from 'dayjs'
import React, { Dispatch } from 'react'

interface EventAge {
	min?: number
	max?: number
}

interface ChoiceData {
	key: string
	description: string
	onSelect: (dispatch: Dispatch<{ type: string; payload: any }>) => void
}

export interface EventConfig {
	key: string
	title: string
	description: string | React.FunctionComponent
	chance: number
	age: EventAge
	choices: ChoiceData[]
}

export interface EventDate {
	key: string
	date: Dayjs
}
