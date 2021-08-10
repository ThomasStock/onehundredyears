import { Button, Container, Typography } from '@material-ui/core'
import useLife from './life/useLife'
import 'dayjs/locale/nl-be'

const App = () => {
	const { date, start, stop, running, getAge } = useLife()
	console.log('running', running)

	const toggleTime = () => (running ? stop() : start())

	return (
		<Container maxWidth="sm">
			<Typography>{date.format('LL')}</Typography>
			<Typography>{date.format('LT')}</Typography>
			<Typography>Leeftijd: {getAge()}</Typography>
			<Button color={running ? 'secondary' : 'primary'} variant="contained" onClick={toggleTime}>
				{running ? 'Stop' : 'Start'}
			</Button>
		</Container>
	)
}

export default App
