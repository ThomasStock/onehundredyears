import { Box, Typography } from '@material-ui/core'
import { Dispatch } from 'react'
import { AddFamiliyAction } from '../../reducer'
import { registerEvent } from '../registry'
import { EventConfig } from '../types'
import { getRandomFromArray } from '../utils'

interface Stats {
	wealth?: number
	love?: number
	intelligence?: number
}

export interface Parent {
	description: (male?: boolean) => string
	stats: Stats
}

const parents: Parent[] = [
	{
		description: (male) => (male ? 'baas van een stofzuiger fabriek' : 'bazin van een stofzuiger fabriek'),
		stats: {
			wealth: 84,
			love: 19,
		},
	},
	{
		description: (male) => (male ? 'leraar Frans' : 'lerares Frans'),
		stats: {
			love: 68,
			intelligence: 58,
			wealth: 43,
		},
	},
	{
		description: (male) => (male ? 'viroloog' : 'virologe'),
		stats: {
			intelligence: 73,
		},
	},
]

const createPickParents = (): EventConfig => {
	const dad = getRandomFromArray(parents)
	const mom = getRandomFromArray(parents)

	return {
		key: 'pickParents',
		title: 'Een koppel bezoekt het weeshuis.',
		description: () => {
			return (
				<>
					<Typography>
						De vader is {dad.description(true)}. De mama is {mom.description(false)}.
					</Typography>
					<Box marginTop={1}>
						<Typography>Hoe gedraag je je?</Typography>
					</Box>
				</>
			)
		},
		chance: 100,
		age: {
			min: 4,
			max: 6,
		},
		choices: [
			{
				key: 'cute',
				description: 'Wees schattig',
				onSelect: (dispatch: Dispatch<AddFamiliyAction>) => {
					dispatch({ type: 'addFamily', payload: { dad, mom } })
				},
			},
			{
				key: 'tantrum',
				description: 'Begin hard te huilen',
				onSelect: () => {
					console.log('pick tantrum')
				},
			},
		],
	}
}

export default createPickParents

registerEvent(createPickParents())
