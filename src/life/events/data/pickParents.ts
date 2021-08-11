import { EventConfig } from '../types'

const pickParents: EventConfig = {
	key: 'pickParents',
	title: 'Een koppel bezoekt het weeshuis.',
	chance: 100,
	age: {
		min: 4,
		max: 6,
	},
	choices: [
		{
			key: 'cute',
			description: 'Wees schattig',
			onSelect: () => {
				console.log('pick cute')
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

export default pickParents
