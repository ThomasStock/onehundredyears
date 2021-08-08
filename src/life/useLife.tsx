import { useEffect, useState } from 'react'
import createLife from '.'

const useLife = () => {
	const life = createLife()
	const [date, setDate] = useState(life.getDate())
	const [intervalID, setIntervalID] = useState(-1)
	const [running, setRunning] = useState(life.running)

	console.log('uselife rerender', date, running)

	const start = () => {
		life.start()
		setIntervalID(
			setInterval(() => {
				setDate(life.getDate())
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
	}
}

export default useLife
