import { useEffect, useState } from 'react'
import createLife from '.'

const useLife = () => {
	const life = createLife()
	const [date, setDate] = useState(life.getDate())
	const [intervalID, setIntervalID] = useState(-1)
	const [running, setRunning] = useState(life.getRunning())

	console.log('uselife rerender', date, running)

	const start = () => {
		life.start()
		setIntervalID(
			setInterval(() => {
				setDate(life.getDate())
				setRunning(life.getRunning())
			}) as any,
		)
	}

	useEffect(
		() => () => {
			clearTimeout(intervalID)
		},
		[],
	)

	return {
		date,
		start,
		running,
	}
}

export default useLife
