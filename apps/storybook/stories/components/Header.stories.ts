import type { Meta, StoryObj } from "@storybook/web-components-vite";
import Header from "./Header.html?raw";

const meta = {
  title: "Recipes/Header",
  component: "dio-header",
  render: () => Header,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {},
};
