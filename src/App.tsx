import { Button, Container, Typography } from '@material-ui/core'
import useLife from './life/useLife'
import dayjs from 'dayjs'
import 'dayjs/locale/nl-be'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import duration from 'dayjs/plugin/duration'
import EventComponent from './life/events/EventComponent'
dayjs.extend(localizedFormat)
dayjs.locale('nl-be')
dayjs.extend(duration)

const App = () => {
	const { date, start, stop, running, birthDate, events, currentEvent } = useLife()

	const toggleTime = () => (running ? stop() : start())

	const age = date.diff(birthDate, 'year')

	return (
		<Container maxWidth="sm">
			<Button color={running ? 'secondary' : 'primary'} variant="contained" onClick={toggleTime}>
				{running ? 'Stop' : 'Start'}
			</Button>
			<br />
			<br />
			<Typography>{date.format('LL LT')}</Typography>

			<Typography>
				Je bent {age} jaar. (Geboren op {birthDate.format('LL')})
			</Typography>
			{currentEvent && <EventComponent eventData={currentEvent} />}
			<ul style={{ position: 'fixed', bottom: 0 }}>
				{[...events].reverse().map((event, index) => (
					<li key={index}>
						<Typography variant="caption" color={index ? 'textSecondary' : 'textPrimary'}>
							{event.date.format('LL LT')}: {event.key}
						</Typography>
					</li>
				))}
			</ul>
		</Container>
	)
}

export default App
