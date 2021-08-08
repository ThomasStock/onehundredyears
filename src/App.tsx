import { Button, Container, Typography } from '@material-ui/core'
import useLife from './life/useLife'
import 'dayjs/locale/nl-be'

const App = () => {
	const { date, start } = useLife()

	const toggleTime = () => start()

	return (
		<Container maxWidth="sm">
			<Typography>{date.format('LL')}</Typography>
			<Typography>{date.format('LT')}</Typography>
			<Typography>Leeftijd: </Typography>
			<Button onClick={toggleTime}>Start</Button>
		</Container>
	)
}

export default App
