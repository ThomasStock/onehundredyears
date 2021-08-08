import dayjs from 'dayjs'
import 'dayjs/locale/nl-be'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

dayjs.locale('nl-be')

const create = () => {
	const startDate = dayjs()
	let currentDate = startDate
	let timer: NodeJS.Timer = undefined as any

	const start = () => {
		timer = setInterval(() => {
			console.log('engine update')
			currentDate = currentDate.add(113, 'minute')
		}, 100)
	}

	const getDate = () => currentDate

	const stop = () => clearInterval(timer)

	return {
		getDate,
		start,
		stop,
		running: !!timer,
	}
}

export default create
