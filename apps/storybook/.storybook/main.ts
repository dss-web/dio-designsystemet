import type { StorybookConfig } from '@storybook/web-components-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/web-components-vite',
  async viteFinal(config) {
    return mergeConfig(config, {
      server: {
        fs: {
          allow: ['../..'],
        },
      },
    })
  },
}
export default config
