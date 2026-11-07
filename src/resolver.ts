import { componentManifest } from './components/manifest'

export interface VakaoUiComponentResolver {
  name: string
  from: string
  sideEffects: string
}

const resolverItems: VakaoUiComponentResolver[] = componentManifest.map((item) => ({
  name: item.name,
  from: '@vakao/ui',
  sideEffects: `@vakao/ui/${item.dir}/style.css`,
}))

/**
 * 供 unplugin-vue-components 使用的解析器：按需引入组件并自动带上对应样式。
 */
export function VakaoUiResolver(): VakaoUiComponentResolver[] {
  return resolverItems
}

export default VakaoUiResolver
