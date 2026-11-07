import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ApiTable from './components/ApiTable.vue'
import ComponentIndex from './components/ComponentIndex.vue'
import DemoBlock from './components/DemoBlock.vue'
import ExampleFrame from './components/ExampleFrame.vue'
import HomeHero from './components/HomeHero.vue'
import SwatchGrid from './components/SwatchGrid.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', DemoBlock)
    app.component('ApiTable', ApiTable)
    app.component('SwatchGrid', SwatchGrid)
    app.component('HomeHero', HomeHero)
    app.component('ComponentIndex', ComponentIndex)
    app.component('ExampleFrame', ExampleFrame)
  },
} satisfies Theme
