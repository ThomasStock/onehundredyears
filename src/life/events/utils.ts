import dayjs, { Dayjs, OpUnitType } from 'dayjs'
import { EventConfig, EventData } from './types'

const steps: OpUnitType[] = ['minute', 'hour', 'day', 'week', 'month', 'year']

export const makeRandomEvent = (currentDate: Dayjs) => {
	const step = Math.round(Math.random() * (steps.length - 1))
	let newEventDate = currentDate
	for (let i = step; i >= 0; i--) {
		const num = (Math.random() * 60) / (i + 1)
		newEventDate = newEventDate.add(num, steps[i])
	}
	return newEventDate
}

const getRandomAge = (minAge = 0, maxAge = 100) => {
	const min = dayjs.duration(minAge, 'years').asMilliseconds()
	const max = dayjs.duration(maxAge, 'years').asMilliseconds()
	const ms = Math.random() * (max - min) + min
	return dayjs.duration(ms)
}

export const generateEvent = (birthDate: Dayjs, { age, key }: EventConfig) => {
	const randomAge = getRandomAge(age.min, age.max)
	const date = birthDate.add(randomAge)
	return { date, key }
}

export const getNextEvent = (events: EventData[]) => {
	return events[events.length - 1]
}
