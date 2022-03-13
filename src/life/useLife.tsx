import dayjs from 'dayjs'
import { useEffect, useMemo } from 'react'
import { lifeActions, selectLife } from './reducer'
import anime, { AnimeInstance } from 'animejs'
import { generateEvent, getNextEvent } from './events/utils'

import { useAppDispatch, useAppSelector } from '../hooks'
import { getEventConfig } from './events/registry'
import { EventConfig } from './events/types'

const QUICK_START = false

let animation: AnimeInstance

const useLife = () => {
	const dispatch = useAppDispatch()
	const state = useAppSelector(selectLife)
	const { date, events, birthDate } = state

	const nextEvent = useMemo(() => getNextEvent(events), [events])
	const currentEvent = nextEvent?.date.valueOf() === date.valueOf() ? nextEvent : undefined

	useEffect(() => {
		dispatch(lifeActions.newEvent(generateEvent(birthDate, getEventConfig('pickParents') as EventConfig)))

		if (QUICK_START) {
			start()
		}
	}, [])

	const start = () => {
		dispatch(lifeActions.start())

		if (animation && !animation.completed) {
			animation.play()
			return
		}

		const currentAnimation = { ticks: date.valueOf() }
		animation = anime({
			targets: currentAnimation,
			ticks: nextEvent?.date.valueOf(),
			duration: QUICK_START ? 200 : 3000,

			change: (_anim) => {
				dispatch(lifeActions.progress(dayjs(currentAnimation.ticks)))
			},
			easing: function (el, i, total) {
				const pow = Math.pow
				return function (x) {
					return x < 0.5 ? x * x * x * x * x * x * x : 1 - pow(-2 * x + 2, 3) / 2
				}
			},
			complete: () => {
				dispatch(lifeActions.progress(nextEvent.date))
				dispatch(lifeActions.stop())
			},
		})
	}

	const stop = () => {
		animation.pause()
		dispatch({ type: 'stop' })
	}

	return {
		...state,
		dispatch,
		currentEvent,
		start,
		stop,
	}
}

export default useLife
