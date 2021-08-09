import dayjs from 'dayjs'
import 'dayjs/locale/nl-be'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

dayjs.locale('nl-be')

const create = ({ onDateChanged, onRunningChanged }: any) => {
	const startDate = dayjs()
	let currentDate = startDate
	let timer: NodeJS.Timer = undefined as any
	let running = false

	const start = () => {
		console.log('starting')
		timer = setInterval(() => {
			currentDate = currentDate.add(1133, 'minute')
			onDateChanged(currentDate)
		}, 100)
		running = true
		onRunningChanged(running)
		console.log('started', timer)
	}

	const getDate = () => currentDate
	const getRunning = () => running

	const stop = () => {
		console.log('stopping', timer)
		running = false
		onRunningChanged(running)
		clearInterval(timer)
		console.log('stopped')
	}

	return {
		getDate,
		start,
		stop,
		getRunning,
	}
}

export default create
