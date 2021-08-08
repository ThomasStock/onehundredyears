import dayjs from 'dayjs'
import 'dayjs/locale/nl-be'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

dayjs.locale('nl-be')

const create = () => {
	const startDate = dayjs()
	let currentDate = startDate
	let timer: NodeJS.Timer = undefined as any
	let running = false

	const start = () => {
		timer = setInterval(() => {
			currentDate = currentDate.add(1133, 'minute')
		}, 100)
		running = true
	}

	const getDate = () => currentDate
	const getRunning = () => running

	const stop = () => {
		running = false
		clearInterval(timer)
	}

	return {
		getDate,
		start,
		stop,
		getRunning,
	}
}

export default create
