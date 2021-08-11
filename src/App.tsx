import { Button, Container, Typography } from '@material-ui/core'
import useLife from './life/useLife'
import dayjs from 'dayjs'
import 'dayjs/locale/nl-be'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)
dayjs.locale('nl-be')

const App = () => {
	const { date, start, stop, running, birthDate, events } = useLife()

	const toggleTime = () => (running ? stop() : start())

	const age = date.diff(birthDate, 'year')

	return (
		<Container maxWidth="sm">
			<Button color={running ? 'secondary' : 'primary'} variant="contained" onClick={toggleTime}>
				{running ? 'Stop' : 'Start'}
			</Button>
			<br />
			<br />
			<Typography>Huidige tijd: {date.format('LL LT')}</Typography>
			<br />
			<Typography>Events:</Typography>
			<ul>
				{[...events].reverse().map((event, index) => (
					<li>
						<Typography color={index ? 'textSecondary' : 'textPrimary'}>{event.format('LL LT')}</Typography>
					</li>
				))}
			</ul>

			<Typography>
				Leeftijd: {age} (Geboren {birthDate.format('LL')})
			</Typography>
		</Container>
	)
}

export default App
