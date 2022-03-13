import { Box, Button, Typography } from '@material-ui/core'
import { AppDispatch } from '../../store'
import registry from './registry'
import { EventConfig, EventDate } from './types'

interface Props {
	eventDate: EventDate
	dispatch: AppDispatch
}

const EventComponent = ({ eventDate, dispatch }: Props) => {
	console.log('eventDate', eventDate)
	const eventConfig = registry.get(eventDate.key) as EventConfig
	const { choices, title, description } = eventConfig
	const Description = typeof description === 'string' ? () => <Typography>{description}</Typography> : description
	return (
		<Box marginTop={3}>
			<Typography variant="h5" gutterBottom>
				{title}
			</Typography>
			<Box marginTop={2} marginBottom={4}>
				<Description />
			</Box>
			<Box marginLeft={5} marginRight={5}>
				{choices.map((choice) => {
					return (
						<Box key={choice.key} marginBottom={1}>
							<Button onClick={() => choice.onSelect(dispatch)} fullWidth variant="contained">
								{choice.description}
							</Button>
						</Box>
					)
				})}
			</Box>
		</Box>
	)
}

export default EventComponent
