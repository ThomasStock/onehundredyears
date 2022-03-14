import dayjs, { Dayjs, OpUnitType } from 'dayjs'
import { EventConfig, EventDate } from './types'

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
	console.log('dayjs', dayjs, minAge, maxAge)
	const min = dayjs.duration(minAge, 'years').asMilliseconds()
	const max = dayjs.duration(maxAge, 'years').asMilliseconds()
	const ms = Math.random() * (max - min) + min
	return dayjs.duration(ms)
}

export const generateEvent = (birthDate: number, { age, key }: EventConfig) => {
	const randomAge = getRandomAge(age.min, age.max)
	const dateTicks = dayjs(birthDate).add(randomAge).valueOf()
	return { dateTicks, key }
}

export const getNextEvent = (events: EventDate[]) => {
	return events[events.length - 1]
}

export const getRandomFromArray = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)]
