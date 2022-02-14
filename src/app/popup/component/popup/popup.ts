import { Component, ChangeDetectionStrategy, Inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { PopupInstance } from '../../popup-instance';

type TState = 'open' | 'close';

@Component({
  selector: 'popup',
  template: `
    <div class="root"
         [@visibility]="state"
         (@visibility.done)="onAnimationDone()">
      <div class="backdrop"
           (click)="close()">
      </div>

      <div class="content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: [ 'popup.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('visibility', [
      transition('* => open', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition('* => close', [
        animate('200ms', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class PopupComponent implements OnInit {
  public state: TState = 'open';

  constructor(
    @Inject(PopupInstance) private popupInstance: PopupInstance<any>,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit() {
    this.popupInstance.onShouldClose()
      .subscribe(() => {
        this.state = 'close';

        this.changeDetectorRef.markForCheck();
      });
  }

  public close(): void {
    this.popupInstance.close();
  }

  public onAnimationDone(): void {
    if (this.state === 'close') {
      this.popupInstance.detach();
    }
  }
}