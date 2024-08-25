// uno.config.ts
import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
