import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { TranslocoService } from "@ngneat/transloco";

@Component({
  selector: "sb-locale-manager",
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
})
export class LocaleManagerComponent implements OnChanges, OnInit {
  @Input() locale: string = "en";

  constructor(private translationService: TranslocoService) {}

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const changedProp = changes[propName];
      this.translationService.setActiveLang(changedProp.currentValue);
    }
  }

  ngOnInit(): void {
    this.translationService.getActiveLang();
  }
}
