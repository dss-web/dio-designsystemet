import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { ParagraphProps } from './Paragraph'
import { Paragraph } from './Paragraph'

const meta = {
  title: 'Typography/Paragraph',
  tags: ['autodocs'],
  render: args => Paragraph(args),
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xl', 'lg', 'md', 'sm', 'xs'],
    },
    text: { control: 'text' },
  },
} satisfies Meta<ParagraphProps>

export default meta
type Story = StoryObj<ParagraphProps>

export const ParagraphXl: Story = {
  name: 'Paragraph XL',
  args: {
    size: 'xl',
    text: 'I am a xl paragraph',
  },
}

export const ParagraphLg: Story = {
  name: 'Paragraph LG',
  args: {
    size: 'lg',
    text: 'I am a lg paragraph',
  },
}

export const ParagraphMd: Story = {
  name: 'Paragraph MD',
  args: {
    size: 'md',
    text: 'I am a md paragraph',
  },
}

export const ParagraphSm: Story = {
  name: 'Paragraph SM',
  args: {
    size: 'sm',
    text: 'I am a sm paragraph',
  },
}

export const ParagraphXs: Story = {
  name: 'Paragraph XS',
  args: {
    size: 'xs',
    text: 'I am a xs paragraph',
  },
}
