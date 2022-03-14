import { createPickParents } from './data/pickParents'
import { registerEventConfig } from './registry'

registerEventConfig(createPickParents())

console.log('registered events')
