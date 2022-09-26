# Angular Storybook I18n Example

This repo shows how you can create a locale switcher for Angular Storybook with Transloco


## 1. Expose transloco to Storybook

To expose Transloco (or any other i18n service) to storybook we need to create a component to wrap our stories in and manage the locale changes. I've done that in [i18n-manager.component.ts](.storybook/with-i18n/i18n-manager.component.ts)

```ts
// i18n-manager.component.ts

import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { TranslocoService } from "@ngneat/transloco";

@Component({
  selector: "sb-locale-manager",
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
})
export class LocaleManagerComponent implements OnChanges {
  @Input() locale: string = "en";

  constructor(private translationService: TranslocoService) {}

  ngOnChanges(changes: SimpleChanges) {
    // If the locale prop has change, update the active locale
    if (changes["locale"]) {
      const changedProp = changes["locale"];
      this.translationService.setActiveLang(changedProp.currentValue);
    }
  }
}
```

Now that we have our manager component, we need to wrap our stories in it.
Inside of [preview.js](.storybook/preview.js) we need to declare two decorators:

1. `moduleMetadata` to inject your i18n service and your manager component
2. The decorator to wrap your stories in the manager component.

```js
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
```

## 2. Add your locale switcher

Declare your global locale variable by adding the following to your [preview.js](.storybook/preview.js)

```js
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
```
