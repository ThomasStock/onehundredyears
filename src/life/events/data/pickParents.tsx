import { Box, Typography } from '@material-ui/core'
import { Dispatch } from 'react'
import { AddFamiliyAction, Stats } from '../../reducer'
import { EventConfig } from '../types'
import { getRandomFromArray } from '../utils'

export interface ParentConfig {
	description: (male?: boolean) => string
	stats: Stats
}

export interface Parent {
	description: string
	stats: Stats
}

const parents: ParentConfig[] = [
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
	{
		description: (male) => (male ? 'metser' : 'werkt in een juwelierszaak'),
		stats: {
			wealth: 43,
			intelligence: 41,
			love: 58,
		},
	},
	{
		description: (male) => (male ? 'topvoetballer' : 'top 10 tennisster'),
		stats: {
			wealth: 92,
			intelligence: 32,
		},
	},
]

export const createPickParents = (): EventConfig => {
	const dadConfig = getRandomFromArray(parents)
	const dad = { ...dadConfig, description: dadConfig.description(true) }
	const momConifg = getRandomFromArray(parents)
	const mom = { ...momConifg, description: momConifg.description(false) }

	return {
		key: 'pickParents',
		title: 'Een koppel bezoekt het weeshuis.',
		description: () => {
			return (
				<>
					<Typography>
						De vader is {dad.description}. De mama is {mom.description}.
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
					console.log('dispatching add family')
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
