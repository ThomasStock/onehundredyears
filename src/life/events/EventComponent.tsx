import { EventData } from './types'

interface Props {
	eventData: EventData
}

const EventComponent = ({ eventData }: Props) => {
	return <>{JSON.stringify(eventData)}</>
}

export default EventComponent
