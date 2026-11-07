import { components } from './components'
import { createInstall } from './core'

export * from './components'
export * from './core'
export * from './tokens'

export default createInstall(components)
