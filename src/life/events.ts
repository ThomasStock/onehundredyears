import { Dayjs, OpUnitType } from 'dayjs'

const steps: OpUnitType[] = ['minute', 'hour', 'day', 'week', 'month', 'year']
export const getNewEvent = (currentDate: Dayjs) => {
	const step = Math.round(Math.random() * (steps.length - 1))
	let newEventDate = currentDate
	for (let i = step; i >= 0; i--) {
		const num = (Math.random() * 60) / (i + 1)
		newEventDate = newEventDate.add(num, steps[i])
	}
	return newEventDate
}

export const getNextEvent = (events: Dayjs[]) => {
	return events[events.length - 1]
}
