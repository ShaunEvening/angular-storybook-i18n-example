import { setCompodocJson } from "@storybook/addon-docs/angular";
import { componentWrapperDecorator, moduleMetadata } from "@storybook/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

import {LocaleManagerComponent} from './with-i18n/i18n-manager.component';
import { TranslocoRootModule } from "src/app/transloco.module"; 
import { HttpClientModule } from "@angular/common/http";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
}

// Create a global variable called locale in storybook
// and add a dropdown in the toolbar to change your locale
export const globalTypes = {
  locale: {
    name: 'Locale',
    title: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'de', title: 'Deutsch' },
        { value: 'ar', title: 'عربي' },
      ],
    },
  },
};

export const decorators = [
  moduleMetadata({
    declarations: [LocaleManagerComponent],
    imports: [TranslocoRootModule, HttpClientModule]
  }),
  (story, context) => {
    const { locale } = context.globals;

    return componentWrapperDecorator(LocaleManagerComponent, { locale })(story, context)
  },
]