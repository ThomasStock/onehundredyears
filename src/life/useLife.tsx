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
	const { dateTicks, events, birthDateTicks } = state

	const nextEvent = useMemo(() => getNextEvent(events), [events])
	const currentEvent = nextEvent?.dateTicks === dateTicks ? nextEvent : undefined

	useEffect(() => {
		dispatch(lifeActions.newEvent(generateEvent(birthDateTicks, getEventConfig('pickParents') as EventConfig)))

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

		const currentAnimation = { ticks: dateTicks }
		animation = anime({
			targets: currentAnimation,
			ticks: nextEvent?.dateTicks,
			duration: QUICK_START ? 200 : 3000,

			change: (_anim) => {
				dispatch(lifeActions.progress(currentAnimation.ticks))
			},
			easing: function (el, i, total) {
				const pow = Math.pow
				return function (x) {
					return x < 0.5 ? x * x * x * x * x * x * x : 1 - pow(-2 * x + 2, 3) / 2
				}
			},
			complete: () => {
				dispatch(lifeActions.progress(nextEvent.dateTicks))
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
