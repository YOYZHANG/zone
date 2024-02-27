import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      border: 'var(--color-border)',
    },
  },
})
