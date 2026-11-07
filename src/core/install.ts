import type { App, Component, Plugin } from 'vue'

export function createInstall(components: Record<string, Component>): Plugin {
  return {
    install(app: App) {
      for (const [name, component] of Object.entries(components)) {
        app.component(name, component)
      }
    },
  }
}
