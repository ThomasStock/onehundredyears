import { Dayjs } from 'dayjs'
import React from 'react'
import { AppDispatch } from '../../store'

interface EventAge {
	min?: number
	max?: number
}

interface ChoiceData {
	key: string
	description: string
	onSelect: (dispatch: AppDispatch) => void
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
