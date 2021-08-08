import { Button, Container, Typography } from '@material-ui/core'
import useLife from './life/useLife'
import 'dayjs/locale/nl-be'

const App = () => {
	const { date, start, running } = useLife()

	const toggleTime = () => start()

	console.log('d', date, running)

	return (
		<Container maxWidth="sm">
			<Typography>{date.format('LL')}</Typography>
			<Typography>{date.format('LT')}</Typography>
			<Typography>Leeftijd: </Typography>
			<Button onClick={toggleTime}>Start</Button>
			{running ? 'running' : null}
		</Container>
	)
}

export default App
