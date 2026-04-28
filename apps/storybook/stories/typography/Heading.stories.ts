import type { HeadingProps } from '@dss-web/regjeringen-components'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { Heading } from '@dss-web/regjeringen-components'

const meta = {
  title: 'Typography/Heading',
  tags: ['autodocs'],
  render: args => Heading(args),
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs'],
      defaultValue: 'md',
    },
    text: { control: 'text' },
  },
} satisfies Meta<HeadingProps>

export default meta
type Story = StoryObj<HeadingProps>

export const Heading2xl: Story = {
  name: 'Heading 2XL',
  args: {
    size: '2xl',
    text: 'I am a 2xl heading',
  },
}

export const HeadingXl: Story = {
  name: 'Heading XL',
  args: {
    size: 'xl',
    text: 'I am a xl heading',
  },
}

export const HeadingLg: Story = {
  name: 'Heading LG',
  args: {
    size: 'lg',
    text: 'I am a lg heading',
  },
}

export const HeadingMd: Story = {
  name: 'Heading MD',
  args: {
    size: 'md',
    text: 'I am a md heading',
  },
}

export const HeadingSm: Story = {
  name: 'Heading SM',
  args: {
    size: 'sm',
    text: 'I am a sm heading',
  },
}

export const HeadingXs: Story = {
  name: 'Heading XS',
  args: {
    size: 'xs',
    text: 'I am a xs heading',
  },
}

export const Heading2xs: Story = {
  name: 'Heading 2XS',
  args: {
    size: '2xs',
    text: 'I am a 2xs heading',
  },
}
