import { CommonModule } from "@angular/common";
import { moduleMetadata, Story, Meta } from "@storybook/angular";

import { AppComponent } from "src/app/app.component";

export default {
  title: "Example/Page",
  component: AppComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<AppComponent> = (args: AppComponent) => ({
  props: args,
});

export const App = Template.bind({});
