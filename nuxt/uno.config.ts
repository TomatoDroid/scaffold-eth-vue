// uno.config.ts
import { defineConfig, presetAttributify, presetUno, presetIcons,transformerDirectives } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons()
  ],
  transformers: [
    transformerDirectives()
  ]
})