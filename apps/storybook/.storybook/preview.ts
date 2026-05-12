import type { Preview } from "@storybook/web-components-vite";

import "./tailwind.css";
import "@dio/dio-designsystem";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
