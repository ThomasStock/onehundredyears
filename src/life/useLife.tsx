import { useEffect, useState } from 'react'
import createLife, { Life } from '.'

const useLife = () => {
	const onUpdate = (newLife: Life) => setLife(newLife)

	const [life, setLife] = useState(createLife({ onUpdate }))

	const start = () => life.start()

	const stop = () => life.stop()

	useEffect(
		() => () => {
			life.stop()
		},
		[],
	)

	return {
		...life,
		start,
		stop,
	}
}

export default useLife
