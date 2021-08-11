import dayjs from 'dayjs'
import { useReducer } from 'react'
import { init, reducer } from './reducer'
import anime, { AnimeInstance } from 'animejs'
import { getNewEvent, getNextEvent } from './events'

let animation: AnimeInstance

const useLife = () => {
	const [state, dispatch] = useReducer(reducer, dayjs(), init)

	const start = () => {
		dispatch({ type: 'start' })

		const currentAnimation = { ticks: state.date.valueOf() }
		const nextEvent = getNextEvent(state.events)
		animation = anime({
			targets: currentAnimation,
			ticks: nextEvent.valueOf(),
			duration: 4000,

			change: (anim) => {
				dispatch({ type: 'progress', payload: dayjs(currentAnimation.ticks) })
			},
			easing: function (el, i, total) {
				const pow = Math.pow
				return function (x) {
					return x < 0.5 ? x * x * x * x * x * x * x : 1 - pow(-2 * x + 2, 3) / 2
				}
			},
			complete: () => {
				dispatch({ type: 'stop' })
				dispatch({ type: 'newEvent', payload: getNewEvent(nextEvent) })
			},
		})
	}

	// useInterval(() => {
	// 	if (state.running) {
	// 		dispatch({ type: 'progress', payload: state.date.add(1, steps[0]) })
	// 	}
	// }, speeds[0])

	const stop = () => {
		animation.pause()
		dispatch({ type: 'stop' })
	}

	// useEffect(() => () => {}, [])

	return {
		...state,
		start,
		stop,
	}
}

export default useLife
