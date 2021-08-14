import { Box, Button, Typography } from '@material-ui/core'
import registry from './registry'
import { EventConfig, EventData } from './types'

interface Props {
	eventData: EventData
}

const EventComponent = ({ eventData }: Props) => {
	const eventConfig = registry.get(eventData.key) as EventConfig
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
							<Button onClick={choice.onSelect} fullWidth variant="contained">
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
