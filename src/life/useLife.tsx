import dayjs from 'dayjs'
import { useEffect, useMemo, useReducer } from 'react'
import { init, reducer } from './reducer'
import anime, { AnimeInstance } from 'animejs'
import { getNextEvent } from './events/utils'

let animation: AnimeInstance

const useLife = () => {
	const [state, dispatch] = useReducer(reducer, dayjs(), init)
	const { date, events } = state
	const nextEvent = useMemo(() => getNextEvent(events), [events])
	const currentEvent = nextEvent.date.valueOf() === date.valueOf() ? nextEvent : undefined

	useEffect(() => start(), [])

	const start = () => {
		dispatch({ type: 'start' })

		if (animation && !animation.completed) {
			animation.play()
			return
		}

		const currentAnimation = { ticks: date.valueOf() }
		animation = anime({
			targets: currentAnimation,
			ticks: nextEvent.date.valueOf(),
			duration: 40,

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
				dispatch({ type: 'progress', payload: nextEvent.date })
				dispatch({ type: 'stop' })
			},
		})
	}

	const stop = () => {
		animation.pause()
		dispatch({ type: 'stop' })
	}

	return {
		...state,
		currentEvent,
		start,
		stop,
	}
}

export default useLife
