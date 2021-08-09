import { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import createLife from '.'

const useLife = () => {
	const onDateChanged = (newDate: Dayjs) => {
		setDate(newDate)
	}
	const onRunningChanged = (newRunning: boolean) => {
		setRunning(newRunning)
	}

	const life = createLife({ onDateChanged, onRunningChanged })
	const [date, setDate] = useState(life.getDate())
	const [running, setRunning] = useState(life.getRunning())

	const start = () => {
		life.start()
	}

	const stop = () => {
		life.stop()
	}

	useEffect(
		() => () => {
			life.stop()
		},
		[],
	)

	return {
		date,
		start,
		stop,
		running,
	}
}

export default useLife
