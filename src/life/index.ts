import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/nl-be'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

dayjs.locale('nl-be')

export interface Life {
	date: Dayjs
	running: boolean
	start: () => void
	stop: () => void
	getAge: () => number
}

type OnUpdate = (newLife: Life) => void

interface Params {
	onUpdate: OnUpdate
}

const create = ({ onUpdate }: Params): Life => {
	const startDate = dayjs()

	const start = () => {
		console.log('starting')
		timer = setInterval(() => {
			life = {
				...life,
				date: life.date.add(1133, 'minute').add(3, 'day'),
				running: true,
			}
			onUpdate(life)
		}, 100)
		console.log('started', timer)
	}

	const stop = () => {
		console.log('stopping', timer)
		life = {
			...life,
			running: false,
		}
		onUpdate(life)
		clearInterval(timer)
		console.log('stopped')
	}

	const getAge = () => life.date.diff(startDate, 'year')

	let life: Life = {
		date: startDate,
		running: false,
		start,
		stop,
		getAge,
	}

	let timer: NodeJS.Timer = undefined as any

	return life
}

export default create
