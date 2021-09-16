import { createRegistry } from '../../registry-factory'
import { EventConfig } from './types'

const registry = createRegistry<EventConfig>()
export default registry

export const registerEventConfig = (eventConfig: EventConfig) => registry.add(eventConfig.key, eventConfig)

export const getEventConfig = registry.get
