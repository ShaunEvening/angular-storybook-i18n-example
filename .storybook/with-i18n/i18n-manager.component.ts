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
